package ch.amphytrion.project.authentication;

import ch.amphytrion.project.dto.AuthenticationDto;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.entities.notdatabaseentities.AuthenticateRequest;
import ch.amphytrion.project.services.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.Json;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.gson.JsonObject;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

// verify user credential and asssign token
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;


    private final UserService userService;
    private static final String TEST_TOKEN = "tokenTest";

    @Autowired
    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;

        // Process only on given URL ?
        setFilterProcessesUrl("/item/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            // Make DTO class to map request to
            String requestData = req.getReader().lines().collect(Collectors.joining());
            AuthenticationDto auth = new ObjectMapper().readValue(requestData, AuthenticationDto.class);
//            String givenInput = obj; //.getAsJsonObject("tokenID").getAsString();
            GoogleIdToken tokenID =  GoogleTokenValider.validateToken(auth.getTokenId());

            if (tokenID != null) {
                GoogleIdToken.Payload payload = tokenID.getPayload();
                User user = userService.findByGoogleId(payload.get("sub").toString());
                return authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user,
                                tokenID,
                                new ArrayList<>())
                );
            } else {
                String tokenSeparated[] = auth.getTokenId().split("-");
                if(tokenSeparated.length == 2 && tokenSeparated[0].equals(TEST_TOKEN)){
                    String username = tokenSeparated[1];
                    User user = userService.findByUsername(username);
                    return authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    user,
                                    TEST_TOKEN,
                                    new ArrayList<>())
                    );
                } else {
                    throw new RuntimeException();
                }
            }
        }catch (IOException | GeneralSecurityException e ) {
            throw new AuthenticationCredentialsNotFoundException("Credentials not found");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException {
        String token = JWT.create()
                .withSubject(((User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));

        String body = ((User) auth.getPrincipal()).getUsername();

        res.addHeader(SecurityConstants.HEADER_STRING, token);
        res.getWriter().write(body);
        res.getWriter().flush();
    }
}

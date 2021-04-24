package ch.amphytrion.project.authentication.google_authentication;

import ch.amphytrion.project.authentication.SecurityConstants;
import ch.amphytrion.project.authentication.utils.AbstractMultiReadAuthenticationProcessingFilter;
import ch.amphytrion.project.dto.AuthenticationDto;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

// verify user credential and asssign token
public class GoogleAuthenticationFilter extends AbstractMultiReadAuthenticationProcessingFilter {

    private AuthenticationManager authenticationManager;
    private final UserService userService;
    private static final String TEST_TOKEN = "tokenTest";

    @Autowired
    public GoogleAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
        super(SecurityConstants.LOGIN_URL, authenticationManager);
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @Override
    protected boolean requiresAuthentication(HttpServletRequest req, HttpServletResponse res){
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream()));
            String requestData = reader.lines().collect(Collectors.joining());
            JsonObject jsonBody =  new Gson().fromJson(requestData, JsonObject.class);
            return jsonBody != null && jsonBody.get("tokenID") != null;
        } catch (IOException e){
            return false;
        }
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            // Make DTO class to map request to
            BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream()));
            String requestData = reader.lines().collect(Collectors.joining());
            JsonObject jsonBody =  new Gson().fromJson(requestData, JsonObject.class);
            return authenticationManager.authenticate(
                    new GoogleAuthenticationToken(
                            null,
                            jsonBody.get("tokenID").getAsString()
                    )
            );
        }catch (IOException  e ) {
            throw new AuthenticationCredentialsNotFoundException("Credentials not found");
        }
    }
}

package ch.amphytrion.project.authentication.dev_authentication;

import ch.amphytrion.project.authentication.SecurityConstants;
import ch.amphytrion.project.authentication.utils.AbstractMultiReadAuthenticationProcessingFilter;
import ch.amphytrion.project.authentication.utils.JwtUtils;
import ch.amphytrion.project.dto.AuthenticationDto;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.stream.Collectors;

// verify user credential and asssign token
public class DevAuthenticationFilter extends AbstractMultiReadAuthenticationProcessingFilter {

    private AuthenticationManager authenticationManager;

    private final UserService userService;
    private static final String TEST_TOKEN = "tokenTest";

    @Autowired
    public DevAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
        super(SecurityConstants.LOGIN_URL, authenticationManager);
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @Override
    protected boolean requiresAuthentication(HttpServletRequest req, HttpServletResponse res){
        if (res.getHeader(SecurityConstants.HEADER_STRING) != null) {
            return false;
        }
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream()));
            String requestData = reader.lines().collect(Collectors.joining());
            AuthenticationDto auth = new ObjectMapper().readValue(requestData, AuthenticationDto.class);
            String tokenSeparated[] = auth.tokenID.split("-");
            return tokenSeparated.length == 2 && tokenSeparated[0].equals(TEST_TOKEN);
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
            AuthenticationDto auth = new ObjectMapper().readValue(requestData, AuthenticationDto.class);
            String tokenSeparated[] = auth.tokenID.split("-");
            if(tokenSeparated.length == 2 && tokenSeparated[0].equals(TEST_TOKEN)){
                String username = tokenSeparated[1];
                User user = userService.findByUsername(username);
                return authenticationManager.authenticate(
                        new DevAuthenticationToken(
                                user,
                                TEST_TOKEN)
                );
            }else {
                throw new AuthenticationCredentialsNotFoundException("Credentials not found");
            }
        }catch (IOException e ) {
            throw new AuthenticationCredentialsNotFoundException("Credentials not found");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(auth);
        JwtUtils.AddTokenWithSuccessfullAuthentication(req, res, chain, auth);
        chain.doFilter(req, res);
    }
}

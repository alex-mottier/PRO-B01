package ch.amphytrion.project.authentication.dev_authentication;

import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;

@Component
public class DevAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserService userService;
    private static final String TEST_TOKEN = "tokenTest";

    public DevAuthenticationProvider(UserService userService){
        this.userService = userService;
    }

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if(authentication.isAuthenticated()) return authentication;
        if(authentication.getPrincipal() == null){
            throw new AuthenticationCredentialsNotFoundException("");
        }
        if(authentication.getCredentials() != TEST_TOKEN){
            return authentication;
        }
        try {
            User user = userService.findByUsername(
                    ((User)authentication.getPrincipal()).getUsername()
            );
            if(user == null) {
                throw new UserPrincipalNotFoundException("User not found");
            }
            return new DevAuthenticationToken(
                            user,
                            TEST_TOKEN,
                            new ArrayList<>());
        } catch (IOException e){
            return authentication;
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(DevAuthenticationToken.class);
    }
}

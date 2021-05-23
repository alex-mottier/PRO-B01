package ch.amphytrion.project.authentication.google_authentication;

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
import java.util.ArrayList;


/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Component
public class GoogleAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserService userService;
    @Autowired
    private GoogleTokenValider valider;


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if(authentication.isAuthenticated()) return authentication;
        if(authentication.getPrincipal() != null){
            throw new AuthenticationCredentialsNotFoundException("");
        }
        if(authentication.getCredentials() == null){
            throw new AuthenticationCredentialsNotFoundException("No openID token foudn");
        }
        String openIdToken = (String) authentication.getCredentials();
        try {

            GoogleIdToken verifiedToken = valider.validateToken(openIdToken);
            if(verifiedToken == null){
                throw new BadCredentialsException("Authentication failed");
            }
            GoogleIdToken.Payload payload = verifiedToken.getPayload();
            User user = userService.findByGoogleId(payload.get("sub").toString());
            if(user == null) {
                throw new UserPrincipalNotFoundException("User not found");
            }
            return new GoogleAuthenticationToken(
                            user,
                            openIdToken,
                            new ArrayList<>());
        } catch (IOException e){
            return authentication;
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(GoogleAuthenticationToken.class);
    }
}

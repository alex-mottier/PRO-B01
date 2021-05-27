package ch.amphytrion.project.authentication.google_authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Configuration
public class GoogleTokenValider {

    @Autowired
    private Environment environment;

    public GoogleIdToken validateToken(String tokenID){

        try {
            String clientID = environment.getProperty("spring.datasource.clientid");
            JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JSON_FACTORY)
                    .setAudience(Collections.singletonList(clientID))
                    .build();
            return verifier.verify(tokenID);
        } catch (GeneralSecurityException | IOException | IllegalArgumentException e){
            return null;
        }
    }

}

package ch.amphytrion.project.authentication.google_authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

public class GoogleTokenValider {

    @Value("${google.clientID}")
    private static String ClIENT_ID;

    public static GoogleIdToken validateToken(String tokenID){
        try {
            JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JSON_FACTORY)
                    .setAudience(Collections.singletonList(ClIENT_ID))
                    .build();
            return verifier.verify(tokenID);
        } catch (GeneralSecurityException | IOException |IllegalArgumentException e){
            return null;
        }
    }
}

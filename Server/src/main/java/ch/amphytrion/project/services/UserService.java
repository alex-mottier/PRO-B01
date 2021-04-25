package ch.amphytrion.project.services;

import ch.amphytrion.project.authentication.google_authentication.GoogleTokenValider;
import ch.amphytrion.project.dto.UserResponse;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService implements IGenericService<User>{

    private final String DEV_TOKEN = "tokenTest";
    private UserRepository userRepository;

    @Autowired
    private GoogleTokenValider valider;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }
    
    @Override
    public User findById(String id) {
        try {
            return userRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public User findByGoogleId(String id) {
        try {
            return userRepository.findByGoogleId(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public User findByUsername(String username) {
        try{
            return userRepository.findByUsername(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public long count() {
        return userRepository.count();
    }

    public UserResponse checkAndSignUp(Map<String, String> json) {
        String userName = json.get("username");
        String tokenInput = json.get("tokenID");

        User newUser = null;
        if(findByUsername(userName) == null) {
            if (tokenInput.equals(DEV_TOKEN)) {
                newUser = new User(null, "mock-google-id" + userName, userName);
            } else {

                GoogleIdToken tokenID = valider.validateToken(tokenInput);
                if (tokenID != null) {
                    GoogleIdToken.Payload payload = tokenID.getPayload();
                    String userId = payload.get("sub").toString();
                    newUser = new User(null, userId, userName);
                }
            }
            userRepository.save(newUser);
            return new UserResponse(newUser);
        }
        else {
            //user already exists
            return null;
        }
    }
}

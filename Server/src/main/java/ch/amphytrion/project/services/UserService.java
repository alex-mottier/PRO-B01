package ch.amphytrion.project.services;

import ch.amphytrion.project.authentication.google_authentication.GoogleTokenValider;
import ch.amphytrion.project.dto.HostRequest;
import ch.amphytrion.project.dto.HostResponse;
import ch.amphytrion.project.dto.StudentRequest;
import ch.amphytrion.project.entities.databaseentities.*;
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

    public User checkAndSignUp(StudentRequest studentRequest) {
        //TODO Separate User creation & unicity check
        String userName = studentRequest.userName;
        String tokenInput = studentRequest.tokenID;
        StudentProfil studentProfil = new StudentProfil();

        User newUser = null;
        if(findByUsername(userName) == null) {
            if (tokenInput.equals(DEV_TOKEN)) {
                newUser = new User("mock-google-id" + userName, userName);
            } else {
                GoogleIdToken tokenID = valider.validateToken(tokenInput);
                if (tokenID != null) {
                    GoogleIdToken.Payload payload = tokenID.getPayload();
                    String userId = payload.get("sub").toString();
                    if(findByGoogleId(userId) == null){
                        newUser = new User(userId, userName);
                    }
                }
            }
            newUser.setStudentProfil(studentProfil);
            userRepository.save(newUser);
        }
        return newUser;
    }


    public User checkAndSignUpHost(HostRequest hostRequest) {
        //TODO Separate User creation & unicity check
        String tokenInput = hostRequest.tokenID;
        String name = hostRequest.name;
        HostProfil hostProfil = new HostProfil();

        User newUser = null;
        if(findByUsername(name) == null) {
            if (tokenInput.equals(DEV_TOKEN)) {
                newUser = new User("mock-google-id" + name, name);
            } else {
                GoogleIdToken tokenID = valider.validateToken(tokenInput);
                if (tokenID != null) {
                    GoogleIdToken.Payload payload = tokenID.getPayload();
                    String userId = payload.get("sub").toString();
                    if(findByGoogleId(userId) == null){
                        newUser = new User(userId, name);
                    }
                }
            }

            //Ajout des informations du host
            City city = new City( hostRequest.cityName, hostRequest.npa);
            Address address = new Address(hostRequest.street, hostRequest.streetNb, city);
            CovidData covidData = new CovidData(true, true, true, "" , "");
            hostProfil.setCovidData(covidData);
            hostProfil.setAddress(address);
            hostProfil.setTags(hostRequest.tags);
            hostProfil.setDescription(hostRequest.description);
            newUser.setHostProfil(hostProfil);
            userRepository.save(newUser);
        }
        return newUser;
    }

}

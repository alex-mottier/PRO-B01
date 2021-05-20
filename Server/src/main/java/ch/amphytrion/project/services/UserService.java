package ch.amphytrion.project.services;

import ch.amphytrion.project.authentication.google_authentication.GoogleTokenValider;
import ch.amphytrion.project.dto.SignUpHostRequest;
import ch.amphytrion.project.dto.StudentRequest;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.repositories.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IGenericService<User>{

    private final String DEV_TOKEN = "tokenTest";
    private UserRepository userRepository;
    private GoogleTokenValider valider;


    @Autowired
    public UserService(UserRepository userRepository, GoogleTokenValider valider) {
        this.userRepository = userRepository;
        this.valider = valider;
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
        String username = studentRequest.username;
        String tokenInput = studentRequest.tokenID;
        StudentProfil studentProfil = new StudentProfil();

        User newUser = null;
        if(findByUsername(username) == null) {
            if (tokenInput.equals(DEV_TOKEN)) {
                newUser = new User("mock-google-id" + username, username);
            } else {
                String googleId = valider.getSubFromToken(tokenInput);
                if(googleId != null && findByUsername(googleId) == null){
                    newUser = new User(googleId, username);
                }
            }
            if(newUser != null){
                newUser.setStudentProfil(studentProfil);
                userRepository.save(newUser);
            }
        }
        return newUser;
    }


    public User checkAndSignUpHost(SignUpHostRequest signUpHostRequest) {
        //TODO Separate User creation & unicity check
        String tokenInput = signUpHostRequest.tokenID;
        String username = signUpHostRequest.name;
        HostProfil hostProfil = new HostProfil();

        User newUser = null;
        if(findByUsername(username) == null) {
            if (tokenInput.equals(DEV_TOKEN)) {
                newUser = new User("mock-google-id" + username, username);
            } else {
                String userId = valider.getSubFromToken(tokenInput);
                if(userId != null && findByUsername(userId) == null){
                    newUser = new User(userId, username);
                }
            }
            if(newUser != null) {
                //Ajout des informations du host
                City city = new City(signUpHostRequest.cityName, signUpHostRequest.npa);
                Address address = new Address(signUpHostRequest.street, signUpHostRequest.streetNb, city);
                CovidData covidData = new CovidData(true, true, true, "", "");
                hostProfil.setCovidData(covidData);
                hostProfil.setAddress(address);
                hostProfil.setTags(signUpHostRequest.tags);
                hostProfil.setDescription(signUpHostRequest.description);
                newUser.setHostProfil(hostProfil);
                userRepository.save(newUser);
            }
        }
        return newUser;
    }

}

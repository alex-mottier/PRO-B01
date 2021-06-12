package ch.amphytrion.project.services;

import ch.amphytrion.project.authentication.google_authentication.GoogleTokenValider;
import ch.amphytrion.project.dto.SignUpHostRequest;
import ch.amphytrion.project.dto.StudentRequest;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Service
public class UserService implements IGenericService<User>{

    private UserRepository userRepository;
    private GoogleTokenValider valider;


    @Autowired
    public UserService(UserRepository userRepository, GoogleTokenValider valider) {
        this.userRepository = userRepository;
        this.valider = valider;
    }

    /**
     * Retrieve all the users of the database
     * @return List<User> List of all the users
     */
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    /**
     * The user to add/update in the database
     * @param user the user to update/add in the database
     * @return User The user added/modified
     */
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * Find a user by its id
     * @param id the id of the user to find in the database
     * @return User The user found
     */
    @Override
    public User findById(String id) {
            return userRepository.findById(id).orElse(null);
    }
    /**
     * Find a user by its GoogleId
     * @param id the GoogleId of the user to find in the database
     * @return User The user found
     */
    public User findByGoogleId(String id) {
        try {
            return userRepository.findByGoogleId(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    /**
     * Find a user by its username
     * @param username the username of the user to find in the database
     * @return User The user found
     */
    public User findByUsername(String username) {
        try{
            return userRepository.findByUsername(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * delete a specified user
     * @param user the user to delete
     */
    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    /**
     * delete a specific user
     * @param id the id of the user to delete
     */
    @Override
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    /**
     * Check the validity of the token of the student and add it to the database
     * @param studentRequest studentRequest
     * @return User the user checked
     */
    public User checkAndSignUp(StudentRequest studentRequest) {

        User newUser = checkUserForCreation(studentRequest.username, studentRequest.tokenID);

        if(newUser != null){
            StudentProfil studentProfil = new StudentProfil();
            newUser.setStudentProfil(studentProfil);
            userRepository.save(newUser);
        }
        
        return newUser;
    }

    /**
     * Check the validity of the token of the host and add it to the database
     * @param signUpHostRequest signUpHostRequest
     * @return User the user checked
     */
    public User checkAndSignUpHost(SignUpHostRequest signUpHostRequest) {

        User newUser = checkUserForCreation(signUpHostRequest.username, signUpHostRequest.tokenID);

        if(newUser != null) {
            //Ajout des informations du host
            City city = new City(signUpHostRequest.cityName, signUpHostRequest.npa);
            Address address = new Address(signUpHostRequest.street, signUpHostRequest.streetNb, city);
            CovidData covidData = new CovidData(true, true, true, "", "");

            HostProfil hostProfil = new HostProfil();
            hostProfil.setCovidData(covidData);
            hostProfil.setAddress(address);
            hostProfil.setTags(signUpHostRequest.tags);
            hostProfil.setDescription(signUpHostRequest.description);
            newUser.setHostProfil(hostProfil);
            userRepository.save(newUser);
        }

        return newUser;
    }

    /**
     * Check user before creation
     *
     * @param username the username of the new user
     * @param tokenInput the token send by the user for verification
     */
    private User checkUserForCreation(String username, String tokenInput){
        if (findByUsername(username) == null) {
            String userId = valider.getSubFromToken(tokenInput);
            if (userId != null && findByGoogleId(userId) == null) {
                return new User(userId, username);
            }
        }
        return null;
    }

}

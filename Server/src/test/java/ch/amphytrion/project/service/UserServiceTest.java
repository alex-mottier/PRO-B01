package ch.amphytrion.project.service;


import ch.amphytrion.project.authentication.google_authentication.GoogleTokenValider;
import ch.amphytrion.project.dto.SignUpHostRequest;
import ch.amphytrion.project.dto.StudentRequest;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@AutoConfigureDataMongo
public class UserServiceTest {

    private static final String BASE_GOOGLE_ID = "google-id-";
    private static final String BASE_USERNAME = "username-";
    private final String OK_GOOGLE_TOKEN = "valid_google_token";
    private final String KO_GOOGLE_TOKEN = "invalid_google_token";

    @Mock
    private GoogleTokenValider valider;
    @Autowired
    private UserRepository repository;
    private UserService service;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
        service = new UserService(repository, valider);
        Mockito.doReturn(BASE_GOOGLE_ID).when(valider).getSubFromToken(OK_GOOGLE_TOKEN);
        Mockito.doReturn(null).when(valider).getSubFromToken(KO_GOOGLE_TOKEN);
    }

    private List<User> createUsers(int nb){
        List<User> users = new ArrayList<>();
        for(int i = 0; i < nb; i++){
            User newUser = new User();
            newUser.setGoogleId(BASE_GOOGLE_ID + i);
            newUser.setUsername(BASE_USERNAME + i);
            repository.save(newUser);
            users.add(newUser);
        }
        return users;
    }

    @Test
    void findAllShouldReturnEmptyArrayIfNone(){
        repository.deleteAll();
        assertEquals(0, service.findAll().size());
    }

    @Test
    void findAllShouldReturnRightNumberOfRecords(){
        createUsers(10);
        assertEquals(10, service.findAll().size());
    }

    @Test
    void findByIdShouldReturnNullIfNotPresent(){
        User user = createUsers(3).get(0);
        assertNull(service.findById(user.getId() + "-fake"));
    }

    @Test
    void findByIdShouldReturnTheUser(){
        User user = createUsers(3).get(0);
        assertEquals(user, service.findById(user.getId()));
    }

    @Test
    void findByGoogleIdShouldReturnNullIfNotPresent(){
        User user = createUsers(3).get(0);
        assertNull(service.findByGoogleId(user.getGoogleId() + "-fake"));
    }

    @Test
    void findByGoogleIdShouldReturnTheUser(){
        User user = createUsers(3).get(0);
        assertEquals(user, service.findByGoogleId(user.getGoogleId()));
    }

    @Test
    void findByUsernameShouldReturnNullIfNotPresent(){
        User user = createUsers(3).get(0);
        assertNull(service.findByUsername(user.getUsername() + "-fake"));
    }

    @Test
    void findByUsernameShouldReturnTheUser(){
        User user = createUsers(3).get(0);
        assertEquals(user, service.findByUsername(user.getUsername()));
    }

    @Test
    void deletedUserShouldNotBeFind(){
        User user = createUsers(3).get(0);
        service.delete(user);
        assertFalse(service.findAll().contains(user));
    }

    @Test
    void deleteInexistantShouldNotThrow(){
        User user = createUsers(3).get(0);
        service.delete(user);
        assertDoesNotThrow(() -> service.delete(user));
    }

    @Test
    void deletedByIdUserShouldNotBeFind(){
        User user = createUsers(3).get(0);
        service.deleteById(user.getId());
        assertFalse(service.findAll().contains(user));
    }

    @Test
    void deletedByIdInexistantShouldNotThrow(){
        User user = createUsers(3).get(0);
        service.deleteById(user.getId());
        assertDoesNotThrow(() -> service.deleteById(user.getId()));
    }

    @Test
    void checkAndSignUpStudentShouldReturnNullIfExistant(){
        User user = createUsers(3).get(0);
        assertNull(service.checkAndSignUp(new StudentRequest(OK_GOOGLE_TOKEN, user.getUsername())));
    }

    @Test
    void checkAndSignUpStudentShouldReturnNullIfInvalidToken(){
        User user = createUsers(3).get(0);
        assertNull(service.checkAndSignUp(new StudentRequest(KO_GOOGLE_TOKEN, user.getUsername() + "-fake")));
    }

    @Test
    void checkAndSignUpStudentShouldReturnNullIfTokenAlreadyUsed(){
        User user = createUsers(3).get(0);
        user.setGoogleId(BASE_GOOGLE_ID);
        service.save(user);
        assertNull(service.checkAndSignUp(new StudentRequest(OK_GOOGLE_TOKEN, user.getUsername() + "-fake")));
    }

    @Test
    void checkAndSignUpStudentShouldCreateNewStudentIfTokenValid(){
        createUsers(3).get(0);
        User newUser = service.checkAndSignUp(new StudentRequest(OK_GOOGLE_TOKEN, BASE_USERNAME + "OK"));
        assertNotNull(service.findById(newUser.getId()));
        assertNotNull(service.findByGoogleId(newUser.getGoogleId()));
    }

    @Test
    void checkAndSignUpHostShouldReturnNullIfExistant(){
        User user = createUsers(3).get(0);
        SignUpHostRequest request = new SignUpHostRequest();
        request.tokenID = OK_GOOGLE_TOKEN;
        request.name = user.getUsername();
        assertNull(service.checkAndSignUpHost(request));
    }

    @Test
    void checkAndSignUpHostShouldReturnNullIfInvalidToken(){
        User user = createUsers(3).get(0);
        SignUpHostRequest request = new SignUpHostRequest();
        request.tokenID = KO_GOOGLE_TOKEN;
        request.name = user.getUsername() + "-fake";
        assertNull(service.checkAndSignUpHost(request));
    }

    @Test
    void checkAndSignUpHostShouldReturnNullIfTokenAlreadyUsed(){
        User user = createUsers(3).get(0);
        user.setGoogleId(BASE_GOOGLE_ID);
        service.save(user);
        SignUpHostRequest request = new SignUpHostRequest();
        request.tokenID = OK_GOOGLE_TOKEN;
        request.name = user.getUsername() + "-fake";
        assertNull(service.checkAndSignUpHost(request));
    }

    @Test
    void checkAndSignUpHostShouldCreateNewHostIfTokenValid(){
        createUsers(3).get(0);
        SignUpHostRequest request = new SignUpHostRequest();
        request.tokenID = OK_GOOGLE_TOKEN;
        request.name = BASE_USERNAME + "OK";
        User newUser = service.checkAndSignUpHost(request);
        assertNotNull(service.findById(newUser.getId()));
        assertNotNull(service.findByGoogleId(newUser.getGoogleId()));
    }
}

package ch.amphytrion.project.controller.userControllerTests;

import ch.amphytrion.project.authentication.google_authentication.GoogleTokenValider;
import ch.amphytrion.project.controller.CustomException;
import ch.amphytrion.project.controller.UserController;
import ch.amphytrion.project.dto.*;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureDataMongo
class UserControllerWithoutUser {

    private final String OK_GOOGLE_TOKEN = "valid_google_token";
    private final String KO_GOOGLE_TOKEN = "invalid_google_token";
    private final String USERNAME = "username";
    private final String GOOGLE_ID = "test-google-id";
    private final String STREET = "test-street";
    private final String STREET_NB = "test-street-nb";
    private final String CITY_NAME = "test-cityname";
    private final String NPA = "test-npa";
    private final String DESCRIPTION = "test-description";
    private final Tag TAGS[] = {new Tag("tag1"), new Tag("tag2"), new Tag("tag3")};


    @Mock
    private GoogleTokenValider valider;
    @Autowired
    private UserRepository userRepository;
    private UserService userService;
    private UserController userController;


    @BeforeEach
    public void setUpNoUser() {
        Authentication auth = new UsernamePasswordAuthenticationToken(null,null);
        SecurityContextHolder.getContext().setAuthentication(auth);
        userService = new UserService(userRepository, valider);
        userRepository.deleteAll();
        userController = new UserController(userService);
        Mockito.doReturn(GOOGLE_ID).when(valider).getSubFromToken(OK_GOOGLE_TOKEN);
        Mockito.doReturn(null).when(valider).getSubFromToken(KO_GOOGLE_TOKEN);
    }

    @Test
    void noCurrentUser() {
        assertThrows(CustomException.class, () -> userController.getCurrentUser());
        assertThrows(CustomException.class, () -> userController.checkUserIsStudent());
        assertThrows(CustomException.class, () -> userController.checkUserIsHost());
    }

    @Test
    void signUpStudentNeedAValidToken(){
        StudentRequest studentRequest = new StudentRequest();
        studentRequest.tokenID = KO_GOOGLE_TOKEN;
        studentRequest.username = USERNAME;
        assertThrows(CustomException.class, () -> userController.signUpStudent(studentRequest));
    }

    @Test
    void signUpValidStudentShouldBeSaved(){
        StudentRequest studentRequest = new StudentRequest();
        studentRequest.tokenID = OK_GOOGLE_TOKEN;
        studentRequest.username = USERNAME;
        ResponseEntity<UserResponse> response = userController.signUpStudent(studentRequest);
        assertEquals(userService.findByGoogleId(GOOGLE_ID), userService.findByUsername(USERNAME));
        assertEquals(response.getBody(), new UserResponse(userService.findByGoogleId(GOOGLE_ID)));
        assertEquals(true, response.getBody().isStudent);
    }

    @Test
    void signUpStudentDeniedIfUsernamePresent(){
        StudentRequest studentRequest = new StudentRequest();
        studentRequest.tokenID = OK_GOOGLE_TOKEN;
        studentRequest.username = USERNAME;
        userService.save(new User(USERNAME, GOOGLE_ID));
        assertThrows(CustomException.class, () -> userController.signUpStudent(studentRequest));
        assertEquals(1, userService.findAll().size());
    }

    @Test
    void signUpHostNeedAValidToken(){
        SignUpHostRequest hostRequest = getSignUpHostRequest();
        hostRequest.tokenID = KO_GOOGLE_TOKEN;
        assertThrows(CustomException.class, () -> userController.signUpHost(hostRequest));
    }

    @Test
    void signUpValidHostShouldBeSaved(){
        SignUpHostRequest hostRequest = getSignUpHostRequest();
        ResponseEntity<UserResponse> response = userController.signUpHost(hostRequest);
        assertEquals(userService.findByGoogleId(GOOGLE_ID), userService.findByUsername(USERNAME));
        assertEquals(response.getBody(), new UserResponse(userService.findByGoogleId(GOOGLE_ID)));
        assertEquals(false, response.getBody().isStudent);
    }

    @Test
    void signUpValiHostShouldHaveAllInfos(){
        SignUpHostRequest hostRequest = getSignUpHostRequest();
        userController.signUpHost(hostRequest);
        City city = new City(null, CITY_NAME, NPA);
        Address address = new Address(STREET, STREET_NB, city);
        HostProfil hostProfil = userService.findByGoogleId(GOOGLE_ID).getHostProfil();
        assertNotNull(hostProfil);
        assertEquals(hostProfil.getAddress(), address);
        assertEquals(hostProfil.getDescription(), DESCRIPTION);
        assertEquals(hostProfil.getTags().size(), 3);
    }

    @Test
    void signUpHostDeniedIfUsernamePresent(){
        SignUpHostRequest hostRequest = getSignUpHostRequest();
        userService.save(new User(USERNAME, GOOGLE_ID));
        assertThrows(CustomException.class, () -> userController.signUpHost(hostRequest));
        assertEquals(1, userService.findAll().size());
    }

    SignUpHostRequest getSignUpHostRequest(){
        SignUpHostRequest hostRequest = new SignUpHostRequest();
        hostRequest.tokenID = OK_GOOGLE_TOKEN;
        hostRequest.username = USERNAME;
        hostRequest.street = STREET;
        hostRequest.streetNb = STREET_NB;
        hostRequest.cityName = CITY_NAME;
        hostRequest.npa = NPA;
        hostRequest.description = DESCRIPTION;
        hostRequest.tags = Arrays.asList(TAGS);
        return hostRequest;
    }

}

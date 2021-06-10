package ch.amphytrion.project.service;


import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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

    @Autowired
    private UserRepository repository;
    @Autowired
    private UserService service;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
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
}

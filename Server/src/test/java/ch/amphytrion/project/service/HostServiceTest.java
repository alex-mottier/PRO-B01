package ch.amphytrion.project.service;


import ch.amphytrion.project.entities.databaseentities.HostProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.HostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@AutoConfigureDataMongo
public class HostServiceTest {

    private static final String BASE_GOOGLE_ID = "google-id-";
    private static final String BASE_USERNAME = "username-";
    private static final String BASE_DESCRIPTION = "description-";

    @Autowired
    private UserRepository repository;
    @Autowired
    private HostService service;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    private List<User> createHosts(int nb){
        List<User> users = new ArrayList<>();
        for(int i = 0; i < nb; i++){
            User newUser = new User();
            newUser.setGoogleId(BASE_GOOGLE_ID + i);
            newUser.setUsername(BASE_USERNAME + i);
            HostProfil profil = new HostProfil();
            profil.setDescription(BASE_DESCRIPTION + i);
            newUser.setHostProfil(profil);
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
        createHosts(10);
        assertEquals(10, service.findAll().size());
    }

    @Test
    void findAllShouldOnlyReturnHosts(){
        List<User> users = createHosts(5);
        for(int i = 0; i < 2; i++){
            User nonHost = users.get(i);
            nonHost.setHostProfil(null);
            repository.save(nonHost);
        }
        assertEquals(3, service.findAll().size());
        assertTrue(service.findAll()
                .stream()
                .filter(u -> u.getHostProfil() == null)
                .collect(Collectors.toList())
                .isEmpty()
        );
    }

    @Test
    void deletedHostShouldNotBeFind(){
        User user = createHosts(3).get(0);
        service.delete(user);
        assertFalse(service.findAll().contains(user));
    }

    @Test
    void deleteInexistantShouldNotThrow(){
        User user = createHosts(3).get(0);
        service.delete(user);
        assertDoesNotThrow(() -> service.delete(user));
    }

    @Test
    void deletedByIdHostShouldNotBeFind(){
        User user = createHosts(3).get(0);
        service.deleteById(user.getId());
        assertFalse(service.findAll().contains(user));
    }

    @Test
    void deletedByIdInexistantShouldNotThrow(){
        User user = createHosts(3).get(0);
        service.deleteById(user.getId());
        assertDoesNotThrow(() -> service.deleteById(user.getId()));
    }
}

package ch.amphytrion.project.service;

import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.StudentService;
import ch.amphytrion.project.services.UserService;
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
public class StudentServiceTest {

    private static final String BASE_GOOGLE_ID = "google-id-";
    private static final String BASE_USERNAME = "username-";

    @Autowired
    private UserRepository repository;
    @Autowired
    private StudentService service;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    private List<User> createStudents(int nb){
        List<User> users = new ArrayList<>();
        for(int i = 0; i < nb; i++){
            User newUser = new User();
            newUser.setGoogleId(BASE_GOOGLE_ID + i);
            newUser.setUsername(BASE_USERNAME + i);
            newUser.setStudentProfil(new StudentProfil());
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
        createStudents(10);
        assertEquals(10, service.findAll().size());
    }

    @Test
    void findAllShouldOnlyReturnStudents(){
        List<User> users = createStudents(5);
        for(int i = 0; i < 3; i++){
            User nonHost = users.get(i);
            nonHost.setStudentProfil(null);
            repository.save(nonHost);
        }
        assertEquals(2, service.findAll().size());
        assertTrue(service.findAll()
                .stream()
                .filter(u -> u.getStudentProfil() == null)
                .collect(Collectors.toList())
                .isEmpty()
        );
    }

    @Test
    void deletedStudentShouldNotBeFind(){
        User user = createStudents(3).get(0);
        service.delete(user);
        assertFalse(service.findAll().contains(user));
    }

    @Test
    void deleteInexistantShouldNotThrow(){
        User user = createStudents(3).get(0);
        service.delete(user);
        assertDoesNotThrow(() -> service.delete(user));
    }

    @Test
    void deletedByIdStudentShouldNotBeFind(){
        User user = createStudents(3).get(0);
        service.deleteById(user.getId());
        assertFalse(service.findAll().contains(user));
    }

    @Test
    void deletedByIdInexistantShouldNotThrow(){
        User user = createStudents(3).get(0);
        service.deleteById(user.getId());
        assertDoesNotThrow(() -> service.deleteById(user.getId()));
    }
}

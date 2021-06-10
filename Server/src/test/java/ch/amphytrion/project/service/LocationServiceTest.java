package ch.amphytrion.project.service;

import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.repositories.LocationRepository;
import ch.amphytrion.project.services.LocationService;
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
public class LocationServiceTest {

    private static final String BASE_NAME = "name-";
    private static final String BASE_DESCRIPTION = "description-";


    @Autowired
    private LocationRepository repository;
    @Autowired
    private LocationService service;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    private List<Location> createLocation(int nb){
        List<Location> locations = new ArrayList<>();
        for(int i = 0; i < nb; i++){
            Location location = new Location();
            location.setName(BASE_NAME + i);
            location.setDescription(BASE_DESCRIPTION + i);
            location.setNbPeople(i);
            repository.save(location);
            locations.add(location);
        }
        return locations;
    }

    @Test
    void findAllShouldReturnEmptyArrayIfNone(){
        repository.deleteAll();
        assertEquals(0, service.findAll().size());
    }

    @Test
    void findAllShouldReturnRightNumberOfRecords(){
        createLocation(10);
        assertEquals(10, service.findAll().size());
    }

    @Test
    void deletedLocationShouldNotBeFind(){
        Location location = createLocation(3).get(0);
        service.delete(location);
        assertFalse(service.findAll().contains(location));
    }

    @Test
    void deleteInexistantShouldNotThrow(){
        Location location = createLocation(3).get(0);
        service.delete(location);
        assertDoesNotThrow(() -> service.delete(location));
    }

    @Test
    void deletedByIdLocationShouldNotBeFind(){
        Location location = createLocation(3).get(0);
        service.deleteById(location.getId());
        assertFalse(service.findAll().contains(location));
    }

    @Test
    void deletedByIdInexistantShouldNotThrow(){
        Location location = createLocation(3).get(0);
        service.deleteById(location.getId());
        assertDoesNotThrow(() -> service.deleteById(location.getId()));
    }
}

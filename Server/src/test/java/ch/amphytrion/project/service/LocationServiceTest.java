package ch.amphytrion.project.service;

import ch.amphytrion.project.entities.databaseentities.Chat;
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
    private static final String BASE_HOST_ID = "host-id-";


    @Autowired
    private LocationRepository repository;
    @Autowired
    private LocationService service;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    private List<Location> createLocations(int nb){
        List<Location> locations = new ArrayList<>();
        for(int i = 0; i < nb; i++){
            Location location = new Location();
            location.setName(BASE_NAME + i);
            location.setDescription(BASE_DESCRIPTION + i);
            location.setHostId(BASE_HOST_ID + i);
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
        createLocations(10);
        assertEquals(10, service.findAll().size());
    }

    @Test
    void findByIdShouldReturnNullIfNotPresent(){
        Location location = createLocations(3).get(0);
        assertNull(service.findById(location.getId() + "-fake"));
    }

    @Test
    void findByIdShouldReturnTheLocation(){
        Location location = createLocations(3).get(0);
        assertEquals(location, service.findById(location.getId()));
    }

    @Test
    void findByHostIdShouldReturnEmptyIfNone(){
        createLocations(3);
        assertTrue(service.findByHostId(BASE_HOST_ID + "-fake").isEmpty());
    }

    @Test
    void findByHostIdShouldReturnAllLocationsOfHost(){
        List<Location> locations = createLocations(5);
        String multiOwnerHostId = locations.get(2).getHostId();
        String noLocationHostId = locations.get(0).getHostId();
        for(int i = 0; i < 2; i++){
            Location location = locations.get(i);
            location.setHostId(multiOwnerHostId);
            repository.save(location);
        }
        assertTrue(service.findByHostId(noLocationHostId).isEmpty());
        assertEquals(3, service.findByHostId(multiOwnerHostId).size());
        assertEquals(1, service.findByHostId(locations.get(4).getHostId()).size());
    }

    @Test
    void deletedLocationShouldNotBeFind(){
        Location location = createLocations(3).get(0);
        service.delete(location);
        assertFalse(service.findAll().contains(location));
    }

    @Test
    void deleteInexistantShouldNotThrow(){
        Location location = createLocations(3).get(0);
        service.delete(location);
        assertDoesNotThrow(() -> service.delete(location));
    }

    @Test
    void deletedByIdLocationShouldNotBeFind(){
        Location location = createLocations(3).get(0);
        service.deleteById(location.getId());
        assertFalse(service.findAll().contains(location));
    }

    @Test
    void deletedByIdInexistantShouldNotThrow(){
        Location location = createLocations(3).get(0);
        service.deleteById(location.getId());
        assertDoesNotThrow(() -> service.deleteById(location.getId()));
    }
}

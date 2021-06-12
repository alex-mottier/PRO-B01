package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Contains all the logic of the location data management
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Service
public class LocationService implements IGenericService<Location> {

    private LocationRepository locationRepository;

    /**
     * Location service constructor
     * @param locationRepository Repository of location class
     */
    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    /**
     * Retrieve all Locations
     * @return List<Location> All locations in database
     */
    @Override
    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    /**
     * Modify/Add location in database
     * @param location The location to update/create
     * @return User the modified/created location
     */
    @Override
    public Location save(Location location) {
        return locationRepository.save(location);
    }

    /**
     * find a location by its id
     * @param id The location to update/create
     * @return User the location found in database
     */
    @Override
    public Location findById(String id) {
            return locationRepository.findById(id).orElse(null);
    }

    /**
     * find a user by its host id
     * @param id The id of the host of the locations to find
     * @return List<Location> List of found locations
     */
    public List<Location> findByHostId(String id) {
        try {
            return locationRepository.findByHostId(id);
        }   catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    /**
     * delete a location
     * @param location the location to delete
     */
    @Override
    public void delete(Location location) {
        locationRepository.delete(location);
    }

    /**
     * delete a location by its id
     * @param id the id of the location to delete
     */
    @Override
    public void deleteById(String id) {
        locationRepository.deleteById(id);
    }


}

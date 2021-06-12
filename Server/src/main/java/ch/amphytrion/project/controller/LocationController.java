package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.LocationResponse;
import ch.amphytrion.project.entities.databaseentities.CovidData;
import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.LocationService;
import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.UserService;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * RESTful location controller. Used to map HTML requests to the corresponding methods
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@RestController
public class LocationController extends BaseController implements IGenericController<Location> {

    private final LocationService locationService;
    private final UserService userService;
    private final MeetingService meetingService;

    /**
     * Constuctor of location controller
     * @param locationService the related location service
     * @param userService the related user service
     * @param meetingService the related meeting service
     */
    public LocationController(LocationService locationService, UserService userService, MeetingService meetingService) {
        this.locationService = locationService;
        this.userService = userService;
        this.meetingService = meetingService;
    }
     /**
     * Retrieve all the locations in the database
     * @throws CustomException
     * @return ResponseEntity<List<Location>> return all the locations of the database RESTful formatted
     */
    @SneakyThrows
    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getAll() {
        try {
            List<Location> locations = locationService.findAll();
            List<Location> openLocations = new ArrayList<>();
            for(Location location : locations) {
                CovidData covidData = userService.findById(location.getHostId()).getHostProfil().getCovidData();
                if(covidData.getIsOpen()) {
                    openLocations.add(location);
                }
            }

            return ResponseEntity.ok().body(openLocations);

        } catch (Exception e) {
            throw new CustomException("Erreur lors de la récupération des locations", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    /**
     * Add a location to the database
     * @param entity a location RESTfully formatted
     * @throws CustomException
     * @return ResponseEntity<LocationResponse> the location created RESTfully formatted
     */
    @SneakyThrows
    @PostMapping("/location")
    public ResponseEntity<LocationResponse> create(@RequestBody Location entity) {
        try {
            checkUserIsHost();
            User user = getCurrentUser();
            if(entity.getId().isEmpty()){
                entity.setHostId(user.getId());
                entity.setId(null);
                Location location = locationService.save(entity);
                return ResponseEntity.ok().body(new LocationResponse( location,  userService));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Erreur lors de la création de la Location", HttpStatus.NOT_ACCEPTABLE, null);
    }


    /**
     * delete a specific location from the database
     * @param locationID the ID of the location
     * @throws CustomException
     */
    @SneakyThrows
    @DeleteMapping("/location/{locationID}")
    public void delete(@PathVariable String locationID) {
        checkUserIsHost();
        Location location;
        try {
            location = locationService.findById(locationID);
        } catch (Exception e) {
            throw new CustomException("Location id : " + locationID + " introuvable", HttpStatus.NOT_ACCEPTABLE, null);
        }
        if(location.getHostId() != getCurrentUser().getId()){
            throw new CustomException("Vous n'êtes pas le propriétaire de ce lieu.", HttpStatus.NOT_ACCEPTABLE, null);
        }
        if(!meetingService.findAllWithLocation(locationID).isEmpty()){
            throw new CustomException("Le lieu ne peut pas être supprimé : des meetings y sont prévus.", HttpStatus.NOT_ACCEPTABLE, null);
        }
        locationService.deleteById(locationID);
    }



    /**
     * update a specific location in the database
     * @param entity the location to update, RESTfully formatted
     * @throws CustomException
     * @return ResponseEntity<LocationResponse> the location updated, RESTfully formatted
     */
    @SneakyThrows
    @PatchMapping("/location")
    public ResponseEntity<LocationResponse> update(@RequestBody Location entity) {
        try {
            if(entity.getId() != null && locationService.findById(entity.getId()) != null){
               return  ResponseEntity.ok().body(new LocationResponse(locationService.save(entity), userService));
            }
        } catch (Exception e) {
            throw new CustomException("Lieu non modifié", HttpStatus.NOT_ACCEPTABLE, null);
        }
        return null;
    }

    /**
     * Retrieve a specific location from the database with its id
     * @param locationId the ID of the location to find
     * @throws CustomException
     * @return ResponseEntity<LocationResponse> the location found, RESTfully formatted
     */
    @SneakyThrows
    @GetMapping("/location/{locationId}")
    public ResponseEntity<LocationResponse> getById(@PathVariable String locationId) {
        try {
            return ResponseEntity.ok().body(new LocationResponse(locationService.findById(locationId), userService));
        } catch (Exception e) {
            throw new CustomException("Ce lieu n'existe pas", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

}

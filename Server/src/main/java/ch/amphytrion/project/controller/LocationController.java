package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.DatesFilterDTO;
import ch.amphytrion.project.dto.LocationFilterDTO;
import ch.amphytrion.project.dto.LocationResponse;
import ch.amphytrion.project.entities.databaseentities.CovidData;
import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.LocationService;
import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LocationController extends BaseController implements IGenericController<Location> {

    private final LocationService locationService;
    private final UserService userService;
    private final MeetingService meetingService;

    public LocationController(LocationService locationService, UserService userService,MeetingService meetingService) {
        this.locationService = locationService;
        this.userService = userService;
        this.meetingService = meetingService;
    }

    //X
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

            return ResponseEntity.ok(openLocations);

        } catch (Exception e) {
            throw new CustomException("Erreur lors de la récupération des locations", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/locations/withDate")
    public ResponseEntity<List<Location>> getAllWithDate(@RequestBody LocationFilterDTO filters) {
        //TODO logique & model dto with startDate & endDate
        try {
            return ResponseEntity.ok(locationService.findAll());
        } catch (Exception e) {
            return ResponseEntity.ok(new ArrayList<Location>());
        }
    }

    //X
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
                return ResponseEntity.ok(new LocationResponse( location,  userService));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Erreur lors de la création de la Location", HttpStatus.NOT_ACCEPTABLE, null);
    }


    //X
    @SneakyThrows
    @DeleteMapping("/location/{locationID}")
    public void delete(@PathVariable String locationID) {
        try {
            //TODO vérifier qu'on supprime bien une location qui nous appartient!! ce serait bête sinon :)
            //TODO : Supprimer une location - revient à supprimer tous les meetings dans ce lieu et supprimer ces meetings - A DISCUTER

            checkUserIsHost();
            locationService.deleteById(locationID);
        } catch (Exception e) {
            throw new CustomException("Location id : " + locationID + " introuvable", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }




    //X
    @SneakyThrows
    @PatchMapping("/location")
    public ResponseEntity<LocationResponse> update(@RequestBody Location entity) {
        try {
            if(entity.getId() != null && locationService.findById(entity.getId()) != null){
               return  ResponseEntity.ok(new LocationResponse(locationService.save(entity), userService));
            }
        } catch (Exception e) {
            throw new CustomException("Lieu non modifié", HttpStatus.NOT_ACCEPTABLE, null);
        }
        return null;
    }

    //X
    @SneakyThrows
    @GetMapping("/location/{locationId}")
    public ResponseEntity<LocationResponse> getById(@PathVariable String locationId) {
        try {
            return ResponseEntity.ok(new LocationResponse(locationService.findById(locationId), userService));
        } catch (Exception e) {
            throw new CustomException("Ce lieu n'existe pas", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    @ApiOperation(value = "Retrieve locationController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached locationController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/locationController")
    private String testController() {
        return this.getClass().getSimpleName();
    }

}

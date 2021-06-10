package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.*;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.services.HostService;
import ch.amphytrion.project.services.LocationService;
import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * RESTful host controller. Used to map HTML requests to the corresponding methods
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@RestController
public class HostController extends BaseController implements IGenericController<HostProfil> {

    private HostService hostService;
    private LocationService locationService;
    private UserService userService;
    private MeetingService meetingService;

    /**
     * Constructor of HostController class
     * @param hostService corresponding host service to the host controller
     * @param locationService corresponding location service to the host controller
     * @param userService corresponding user service to the host controller
     * @param meetingService corresponding meeting service to the host controller
     */
    @Autowired
    public HostController(HostService hostService, LocationService locationService, UserService userService, MeetingService meetingService) {
        this.hostService = hostService;
        this.locationService = locationService;
        this.userService = userService;
        this.meetingService = meetingService;
    }

    /**
     * Return all hosts
     * @throws CustomException
     * @return ResponseEntity<List<UserResponse>> a RESTful list of students
     */
    @SneakyThrows
    public ResponseEntity<List<UserResponse>> getAll() {
        try {
            List<User> hosts = hostService.findAll();
            return ResponseEntity.ok(
                    hosts.stream()
                            //TODO : list of student ? is that right?
                            .map(student -> new UserResponse(student))
                            .collect(Collectors.toList())
            );
        } catch (Exception e) {
            throw new CustomException("Aucun hôte trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    /**
     * Method used to create a host from its user
     * @param entity user's datas to create
     * @throws CustomException
     * @return ResponseEntity<HostResponse> The RESTful formatted host created
     */
    @SneakyThrows
    public ResponseEntity<HostResponse> save(User entity) {
        try {
            return ResponseEntity.ok(new HostResponse(hostService.save(entity)));
        } catch (Exception e) {
            throw new CustomException("hôte non modifié/créé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    /**
     * Used to retrieve host by its id
     * @param id the id of the host
     * @throws CustomException
     * @throws CustomException
     * @return ResponseEntity<HostResponse> The RESTful formatted host found
     */
    @SneakyThrows
    @GetMapping("/host/{id}")
    public ResponseEntity<HostResponse> getById(@PathVariable String id) {
        try {
            User host = hostService.findById(id);
            if (host != null) {
                return ResponseEntity.ok(new HostResponse(host));
            } else {
                throw new CustomException("Aucun hôte correspondant trouvé", HttpStatus.NOT_ACCEPTABLE, null);
            }
        } catch (Exception e) {
            throw new CustomException("Aucun hôte correspondant trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    /**
     * Used to get host's locations
     * @throws CustomException
     * @return ResponseEntity<List<LocationResponse>> The RESTful locations retrieved from host
     */
    //X
    @SneakyThrows
    @GetMapping("/getMyLocations")
    public ResponseEntity<List<LocationResponse>> getMyLocations() {
        try {
            checkUserIsHost();
            User user = getCurrentUser();
            ArrayList<LocationResponse> locationResponses = new ArrayList<>();
            String userID = user.getId();
            for(Location location : locationService.findByHostId(userID)) {
                locationResponses.add(new LocationResponse(location, userService));
            }
            return ResponseEntity.ok(locationResponses);
        } catch (Exception e) {
            throw new CustomException("Aucune location n'a été trouvée", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    /**
     * Method used to update/create a host from its user
     * @param hostRequest RESTful formatted host
     * @throws CustomException
     * @return ResponseEntity<HostResponse> The RESTful formatted host updated
     */
    @SneakyThrows
    @PatchMapping("/host")
    public ResponseEntity<HostResponse> update(@RequestBody HostRequest hostRequest) {
        try {
            checkUserIsHost();
            User user = getCurrentUser();
            user.setUsername(hostRequest.name);
            HostProfil hostProfil = user.getHostProfil();
            hostProfil.setDescription(hostRequest.description);
            hostProfil.setTags(hostRequest.tags);
            hostProfil.setAddress(new Address(hostRequest.address.street, hostRequest.address.streetNb,
                    new City(hostRequest.address.cityName, hostRequest.address.npa)));
            hostProfil.setCovidData(hostRequest.covidData);
            user.setHostProfil(hostProfil);
            return ResponseEntity.ok(new HostResponse(userService.save(user)));
        } catch (Exception e) {
            throw new CustomException("L'hôte n'a pas été mis à jour", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    /**
     * return all the meetings of the locations of the host between two dates
     * @param datesFilterDTO Object made of two dates, REST convenient
     * @throws CustomException
     * @return ResponseEntity<List<MeetingResponse>> The RESTful formatted list of meetings between the specified dates
     */
    @SneakyThrows
    @PostMapping("/getReservations")
    public ResponseEntity<List<MeetingResponse>> getReservations(@RequestBody DatesFilterDTO datesFilterDTO) {
        try {
            checkUserIsHost();
            User user = getCurrentUser();
            List<Location> locations = locationService.findByHostId(user.getId());
            List<Meeting> meetings = new ArrayList<>();
            List<MeetingResponse> meetingResponses = new ArrayList<>();
            for(Location location : locations) {
                meetings.addAll(meetingService.findByLocationID(location.getId()));
            }

            //Filtrer meetings à l'aide d'iterator car pas de remove dans un foreach
            Iterator<Meeting> iterator = meetings.iterator();
            while(iterator.hasNext()) {
                Meeting meeting = iterator.next();
                DatesFilterDTO dto = new DatesFilterDTO(meeting.getStartDate(), meeting.getEndDate());
                if (!dto.isBetween(datesFilterDTO)) {
                    iterator.remove();
                }
            }

            //Construction de la liste de meetingResponses
            for(Meeting meeting : meetings) {
                Location location = locationService.findById(meeting.getLocationID());
                meetingResponses.add(new MeetingResponse(meeting, location));
            }
            return ResponseEntity.ok(meetingResponses);
        }
        catch (Exception e) {
            throw new CustomException("Impossible de récupérer la liste des meetings", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

}

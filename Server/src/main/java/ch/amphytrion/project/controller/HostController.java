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

@RestController
public class HostController extends BaseController implements IGenericController<HostProfil> {

    private HostService hostService;
    private LocationService locationService;
    private UserService userService;
    private MeetingService meetingService;

    @Autowired
    public HostController(HostService hostService, LocationService locationService, UserService userService, MeetingService meetingService) {
        this.hostService = hostService;
        this.locationService = locationService;
        this.userService = userService;
        this.meetingService = meetingService;
    }

    @SneakyThrows
    @GetMapping("/hosts")
    public ResponseEntity<List<UserResponse>> getAll() {
        try {
            List<User> hosts = hostService.findAll();
            return ResponseEntity.ok(
                    hosts.stream()
                            .map(student -> new UserResponse(student))
                            .collect(Collectors.toList())
            );
        } catch (Exception e) {
            throw new CustomException("Aucun hôte trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }
    @SneakyThrows
    @PostMapping("/host")
    public ResponseEntity<HostResponse> save(User entity) {
        try {
            return ResponseEntity.ok(new HostResponse(hostService.save(entity)));
        } catch (Exception e) {
            throw new CustomException("hôte non modifié/créé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

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

    @SneakyThrows
    @GetMapping("/getCovidData")
    public ResponseEntity<CovidDataResponse> getCovidData() {
        try {
            checkUserIsHost();
            User user = getCurrentUser();
            return ResponseEntity.ok(new CovidDataResponse(user.getHostProfil().getCovidData()));
        } catch (Exception e) {
            throw new CustomException("Aucune donnée covid n'a été trouvée", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    @SneakyThrows
    @PatchMapping("/host")
    public ResponseEntity<HostResponse> update(@RequestBody HostRequest hostRequest) {
        try {
            checkUserIsHost();
            User user = getCurrentUser();
            HostProfil hostProfil = user.getHostProfil();
            hostProfil.setDescription(hostRequest.description);
            hostProfil.setTags(hostRequest.tags);
            hostProfil.setAddress(new Address(hostRequest.address.street, hostRequest.address.streetNb,
                    new City(hostRequest.address.cityName, hostRequest.address.npa)));
            user.setHostProfil(hostProfil);
            return ResponseEntity.ok(new HostResponse(userService.save(user)));
        } catch (Exception e) {
            throw new CustomException("Lieu non modifié/créé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    @SneakyThrows
    @GetMapping("/getReservations")
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
                meetingResponses.add(new MeetingResponse(meeting, locationService));
            }
            return ResponseEntity.ok(meetingResponses);
        }
        catch (Exception e) {
            throw new CustomException("Impossible de récupérer la liste des meetings", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }


    @ApiOperation(value = "Retrieve hostController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached hostController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/hostController")
    private String testController() {
        return this.getClass().getSimpleName();
    }

}

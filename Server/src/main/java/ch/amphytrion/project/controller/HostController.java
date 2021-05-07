package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.*;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.services.HostService;
import ch.amphytrion.project.services.LocationService;
import ch.amphytrion.project.services.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class HostController extends BaseController implements IGenericController<HostProfil> {

    private HostService hostService;
    private LocationService locationService;
    private UserService userService;

    @Autowired
    public HostController(HostService hostService, LocationService locationService, UserService userService) {
        this.hostService = hostService;
        this.locationService = locationService;
        this.userService = userService;
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

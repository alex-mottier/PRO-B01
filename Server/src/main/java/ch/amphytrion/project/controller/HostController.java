package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.HostResponse;
import ch.amphytrion.project.dto.UserResponse;
import ch.amphytrion.project.entities.databaseentities.HostProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class HostController extends BaseController implements IGenericController<HostProfil> {

    private UserService hostService;

    @Autowired
    public HostController(UserService hostService) {
        this.hostService = hostService;
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
//    @SneakyThrows
//    @PostMapping("/host")
//    public ResponseEntity<HostProfil> save(User entity) {
//        try {
//            return ResponseEntity.ok(hostService.save(entity));
//        } catch (Exception e) {
//            throw new CustomException("hôte non modifié/créé", HttpStatus.NOT_ACCEPTABLE, null);
//        }
//    }
    @SneakyThrows
    @GetMapping("/host/{id}")
    public ResponseEntity<HostResponse> getById(String id) {
        try {
            return ResponseEntity.ok(new HostResponse(hostService.findById(id)));
        } catch (Exception e) {
            throw new CustomException("Aucun hôte trouvé", HttpStatus.NOT_ACCEPTABLE, null);
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

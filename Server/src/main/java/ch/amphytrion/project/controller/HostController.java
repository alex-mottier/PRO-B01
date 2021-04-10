package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.Host;
import ch.amphytrion.project.services.HostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HostController extends BaseController implements IGenericController<Host> {

    private HostService hostService;

    @Autowired
    public HostController(HostService hostService) {
        this.hostService = hostService;
    }

    @Override
    public ResponseEntity<List<Host>> getAll() {
        try {
            return ResponseEntity.ok(hostService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity save(Host entity) {
        try {
            return ResponseEntity.ok(hostService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity getById(String id) {
        try {
            return ResponseEntity.ok(hostService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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

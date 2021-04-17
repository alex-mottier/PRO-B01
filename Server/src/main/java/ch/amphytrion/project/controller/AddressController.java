package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Address;
import ch.amphytrion.project.services.AddressService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AddressController extends BaseController implements IGenericController<Address> {
    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @Override
    @GetMapping("/addresses")
    public ResponseEntity<List<Address>> getAll() {
        try {
            return ResponseEntity.ok(addressService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @PostMapping("/address")
    public ResponseEntity<Address> save(Address entity) {
        try {
            return ResponseEntity.ok(addressService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/address/{id}")
    public ResponseEntity<Address> getById(String id) {
        try {
            return ResponseEntity.ok(addressService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ApiOperation(value = "Retrieve AddressController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached AddressController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    //@GetMapping("/addressController")
    private String testController() {
        return this.getClass().getSimpleName();
    }


}

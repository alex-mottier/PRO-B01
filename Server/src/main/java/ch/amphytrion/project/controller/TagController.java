package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Tag;
import ch.amphytrion.project.services.TagService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagController extends BaseController implements IGenericController<Tag> {

    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAll() {
        try {
            return ResponseEntity.ok(tagService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }    }

    @PostMapping("/tag")
    public ResponseEntity<Tag> save(Tag entity) {
        try {
            return ResponseEntity.ok(tagService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/tag/{id}")
    public ResponseEntity<Tag> getById(String id) {
        try {
            return ResponseEntity.ok(tagService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ApiOperation(value = "Retrieve tagController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached tagController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/tagController")
    private String testController() {
        return this.getClass().getSimpleName();
    }
}

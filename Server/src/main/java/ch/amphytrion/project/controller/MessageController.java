package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Message;
import ch.amphytrion.project.services.MessageService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MessageController extends BaseController implements IGenericController<Message> {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
       this.messageService = messageService;
    }

    @Override
    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getAll() {
        try {
            return ResponseEntity.ok(messageService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @PostMapping("/message")
    public ResponseEntity<Message> save(Message entity) {
        try {
            return ResponseEntity.ok(messageService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/message/{id}")
    public ResponseEntity<Message> getById(String id) {
        try {
            return ResponseEntity.ok(messageService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ApiOperation(value = "Retrieve messageController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached messageController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/messageController")
    private String testController() {
        return this.getClass().getSimpleName();
    }
}

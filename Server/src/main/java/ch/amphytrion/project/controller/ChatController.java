package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.Chat;
import ch.amphytrion.project.services.ChatService;
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
public class ChatController extends BaseController implements IGenericController<Chat> {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @Override
    @GetMapping("/chat")
    public ResponseEntity<List<Chat>> getAll() {
        try {
            return ResponseEntity.ok(chatService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @PostMapping("/chat")
    public ResponseEntity save(Chat entity) {
        try {
            return ResponseEntity.ok(chatService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/chat")
    public ResponseEntity getById(String id) {
        try {
            return ResponseEntity.ok(chatService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ApiOperation(value = "Retrieve chatController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached chatController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/chatController")
    private String testController() {
        return this.getClass().getSimpleName();
    }

}

package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Message;
import ch.amphytrion.project.entities.databaseentities.Student;
import ch.amphytrion.project.services.ChatService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ChatController extends BaseController implements IGenericController<Chat> {

    @Autowired
    private ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    //X
    @PostMapping("/chat/createMessage/{chatId}")
    public ResponseEntity<Chat> createMessage(@PathVariable String chatId, @RequestBody Message message) {
        Student student = null; // TODO Use current user
        Chat chat = chatService.findById(chatId);

        try {
            if(student != null){
                message.setUsername(student.getUsername());
                chat.getMessages().add(message);
                return ResponseEntity.ok(chatService.save(chat));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    //X
    @Override
    @GetMapping("/chat/{chatId}")
    public ResponseEntity<Chat> getById(@PathVariable String chatId) {
        try {
            return ResponseEntity.ok(chatService.findById(chatId));
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

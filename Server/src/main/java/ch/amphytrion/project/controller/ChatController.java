package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Message;
import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.ChatService;
import ch.amphytrion.project.services.MessageService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ChatController extends BaseController implements IGenericController<Chat> {

    @Autowired
    private ChatService chatService;
    private MessageService messageService;

    @Autowired
    public ChatController(ChatService chatService, MessageService messageService) {
        this.chatService = chatService;
        this.messageService = messageService;
    }

    //X
    @SneakyThrows
    @PostMapping("/chat/createMessage/{chatId}")
    public ResponseEntity<Chat> createMessage(@PathVariable String chatId, @RequestBody Message message) {
        User currentUser = getCurrentUser();
        StudentProfil studentProfil = currentUser.getStudentProfil();
        Chat chat = chatService.findById(chatId);
        try {
            if(studentProfil != null){
                message.setUsername(currentUser.getUsername());
                if (chat.getMessages() != null) {
                    chat.getMessages().add(message);
                } else {
                    ArrayList<Message> messages = new ArrayList<>();
                    messages.add(message);
                    chat.setMessages(messages);
                }
                return ResponseEntity.ok(chatService.save(chat));
            }
        } catch (Exception e) {
            throw new CustomException("Le message n'a pas pu être créé", HttpStatus.NOT_ACCEPTABLE, null);
        }
        throw new CustomException("Le message n'a pas pu être créé", HttpStatus.NOT_ACCEPTABLE, null);
    }

    //X
    @SneakyThrows
    @GetMapping("/chat/{chatId}")
    public ResponseEntity<Chat> getById(@PathVariable String chatId) {
        try {
            return ResponseEntity.ok(chatService.findById(chatId));
        } catch (Exception e) {
            throw new CustomException("Le chat n'existe pas", HttpStatus.NOT_ACCEPTABLE, null);
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

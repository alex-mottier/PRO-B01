package ch.amphytrion.project.controller.chatControllerTests;

import ch.amphytrion.project.controller.ChatController;
import ch.amphytrion.project.controller.CustomException;
import ch.amphytrion.project.controller.UserController;
import ch.amphytrion.project.dto.UserResponse;
import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Message;
import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.ChatService;
import ch.amphytrion.project.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureDataMongo
class ChatControllerWithStudentTest {

   private static final String GOOGLE_ID = "google-mock-up-id";
   private static final String STUDENT_NAME = "StudentName";
   private static final String STUDENT_NAME2 = "StudentName2";
   private static final String OK_CHAT_ID = "ok-chat-id";
   private static final String KO_CHAT_ID = "ko-chat-id";
   private static final String MSG_TEST = "msg-test";

   @Autowired
   private UserRepository userRepository;
   @Autowired
   private ChatRepository chatRepository;
   @Autowired
   private ChatService chatService;
   @Autowired
   private ChatController chatController;
   private User user;
   private Chat chat;

    @BeforeEach
    public void setUpStudent() {
        // add principal object to SecurityContextHolder
        chatRepository.deleteAll();
        userRepository.deleteAll();
        user = new User(GOOGLE_ID, STUDENT_NAME);
        user.setStudentProfil(new StudentProfil());
        chat = new Chat();
        chat.setId(OK_CHAT_ID);
        List<Message> messages = new ArrayList<>();
        messages.add(new Message(null, "m1", STUDENT_NAME, LocalDateTime.now()));
        messages.add(new Message(null, "m2", STUDENT_NAME2, LocalDateTime.now()));
        messages.add(new Message(null, "m3", STUDENT_NAME2, LocalDateTime.now()));
        messages.add(new Message(null, "m4", STUDENT_NAME, LocalDateTime.now()));
        chat.setMessages(messages);
        chatRepository.save(chat);
        chat = chatService.findById(OK_CHAT_ID);
        userRepository.save(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(user,null);
        SecurityContextHolder.getContext().setAuthentication(auth);

    }

    @Test
    void getByIdThrowIfInexistant() {
        assertThrows(CustomException.class, () -> chatController.getById(KO_CHAT_ID));
    }

    @Test
    void getByIdReturnChatIfFound() {
        assertEquals(chat, chatController.getById(OK_CHAT_ID).getBody());
    }

    @Test
    void createMessageNeedAExistingChat() {
        Message newMessage = new Message(null, MSG_TEST, null, LocalDateTime.now());
        assertThrows(CustomException.class, () -> chatController.createMessage(KO_CHAT_ID, newMessage));
    }

    @Test
    void createMessageWithCurrentUser() {
        Message newMessage = new Message(null, MSG_TEST, null, LocalDateTime.now());
        assertDoesNotThrow(() -> chatController.createMessage(OK_CHAT_ID, newMessage));
        chat = chatService.findById(OK_CHAT_ID);
        assertEquals(5, chat.getMessages().size());
        assertEquals(user.getUsername(), chat.getMessages().get(4).getUsername());
    }

}

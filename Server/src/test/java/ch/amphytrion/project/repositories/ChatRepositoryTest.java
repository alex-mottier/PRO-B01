package ch.amphytrion.project.repositories;

import ch.amphytrion.project.controller.ChatController;
import ch.amphytrion.project.services.ChatService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ChatRepositoryTest {

    MeetingRepository meetingRepository;
    @Autowired
    private ChatService chatService;
    ChatController chatController = new ChatController(chatService);


    @Test
    void meetingGetIdTest() {/*
       try{
            Student s1 = new Student();
            Message m1 = new Message();
            Message m2 = new Message();
            ArrayList<Message> messages = new ArrayList<>();
            messages.add(m1);
            messages.add(m2);
            Meeting meeting = new Meeting(null, s1, null, null, null,"meeting", 0, 0);
            Chat chat = new Chat(messages,null);
            chatService.save(chat);
            assertEquals(chat.getId(), chatService.findById(chat.getId()).getId() );
            chatService.deleteById(chat.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }*/
    }
}

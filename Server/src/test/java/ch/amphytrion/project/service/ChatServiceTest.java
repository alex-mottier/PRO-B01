package ch.amphytrion.project.service;


import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.services.ChatService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;


@SpringBootTest
@AutoConfigureDataMongo
public class ChatServiceTest {

    @Autowired
    private ChatRepository repository;
    @Autowired
    private ChatService service;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    private List<Chat> createChats(int nb){
        List<Chat> chats = new ArrayList<>();
        for(int i = 0; i < nb; i++){
            Chat chat = new Chat();
            repository.save(chat);
            chats.add(chat);
        }
        return chats;
    }

    @Test
    void findAllShouldReturnEmptyArrayIfNone(){
        repository.deleteAll();
        assertEquals(0, service.findAll().size());
    }

    @Test
    void findAllShouldReturnRightNumberOfRecords(){
        createChats(10);
        assertEquals(10, service.findAll().size());
    }

    @Test
    void findByIdShouldReturnNullIfNotPresent(){
        Chat chat = createChats(3).get(0);
        assertNull(service.findById(chat.getId() + "-fake"));
    }

    @Test
    void findByIdShouldReturnTheUser(){
        Chat chat = createChats(3).get(0);
        assertEquals(chat, service.findById(chat.getId()));
    }

    @Test
    void deletedUserShouldNotBeFind(){
        Chat chat = createChats(3).get(0);
        service.delete(chat);
        assertFalse(service.findAll().contains(chat));
    }

    @Test
    void deleteInexistantShouldNotThrow(){
        Chat chat = createChats(3).get(0);
        service.delete(chat);
        assertDoesNotThrow(() -> service.delete(chat));
    }

    @Test
    void deletedByIdUserShouldNotBeFind(){
        Chat chat = createChats(3).get(0);
        service.deleteById(chat.getId());
        assertFalse(service.findAll().contains(chat));
    }

    @Test
    void deletedByIdInexistantShouldNotThrow(){
        Chat chat = createChats(3).get(0);
        service.deleteById(chat.getId());
        assertDoesNotThrow(() -> service.deleteById(chat.getId()));
    }
}

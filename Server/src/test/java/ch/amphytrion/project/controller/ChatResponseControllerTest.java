package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.services.ChatService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ChatControllerTest {

    ChatRepository chatRepository;
    ChatService chatService = new ChatService(chatRepository);
    ChatController chatController = new ChatController(chatService);

    @Test
    void name() {
        assertEquals(ChatController.class.getCanonicalName(),
                chatController.controllerName());
    }
}

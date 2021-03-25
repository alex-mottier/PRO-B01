package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.MessageRepository;
import ch.amphytrion.project.services.MessageService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MessageControllerTest {

    MessageRepository messageRepository;
    MessageService messageService = new MessageService(messageRepository);
    MessageController messageController = new MessageController(messageService);

    @Test
    void name() {
        assertEquals(MessageController.class.getCanonicalName(),
                messageController.controllerName());
    }
}

package ch.amphytrion.project.services;

import ch.amphytrion.project.controller.CustomException;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.entities.databaseentities.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Contains all the logic of the chat data management
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Service
public class ChatService implements IGenericService<Chat> {

    private ChatRepository chatRepository;

    /**
     * Chat service constructor
     * @param chatRepository Repository of chat class
     */
    @Autowired
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    /**
     * Search for all chats in database
     * @return List<Chat> list of all chats
     */
    @Override
    public List<Chat> findAll() {
        return chatRepository.findAll();
    }

    /**
     * Create or update a chat
     * @param host the chat to add/modify
     * @return Chat the chat that has been added or modified
     */
    @Override
    public Chat save(Chat host) {
        return chatRepository.save(host);
    }

    /**
     * Retrieve a chat by its id
     * @param id the chat to add/modify
     * @return Chat the chat that has been found
     */
    @Override
    public Chat findById(String id) {
        return chatRepository.findById(id).orElse(null);
    }

    /**
     * Delete a chat
     * @param host the chat to delete from the database
     */
    @Override
    public void delete(Chat host) {
        chatRepository.delete(host);
    }

    /**
     * Delete a chat by its id
     * @param id the id of the chat to delete from the database
     */
    @Override
    public void deleteById(String id) {
        chatRepository.deleteById(id);
    }


}

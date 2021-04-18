package ch.amphytrion.project.services;

import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.entities.databaseentities.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService implements IGenericService<Chat> {

    private ChatRepository chatRepository;

    @Autowired
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @Override
    public List<Chat> findAll() {
        return chatRepository.findAll();
    }

    @Override
    public Chat save(Chat host) {
        return chatRepository.save(host);
    }

    @Override
    public Chat findById(String id) {
        try {
            return chatRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(Chat host) {
        chatRepository.delete(host);
    }

    @Override
    public void deleteById(String id) {
        chatRepository.deleteById(id);
    }

    @Override
    public long count() {
        return chatRepository.count();
    }

}

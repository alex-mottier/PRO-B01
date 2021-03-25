package com.example.services;

import com.example.entities.Message;
import com.example.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService implements IGenericService<Message> {

    private MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public List<Message> findAll() {
        return messageRepository.findAll();
    }

    @Override
    public Message save(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Message findById(long id) {
        try {
            return messageRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(Message message) {
        messageRepository.delete(message);
    }

    @Override
    public void deleteById(long id) {
        messageRepository.deleteById(id);
    }

    @Override
    public long count() {
        return messageRepository.count();
    }

}

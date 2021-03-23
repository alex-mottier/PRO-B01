package com.example.services;

import com.example.entities.MessageImage;
import com.example.repositories.MessageImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageImageService implements IGenericService<MessageImage> {

    private MessageImageRepository messageImageRepository;

    public MessageImageService(MessageImageRepository messageImageRepository) {
        this.messageImageRepository = messageImageRepository;
    }

    @Override
    public List<MessageImage> findAll() {
        return messageImageRepository.findAll();
    }

    @Override
    public MessageImage save(MessageImage messageImage) {
        return messageImageRepository.save(messageImage);
    }

    @Override
    public MessageImage findById(long id) {
        try {
            return messageImageRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(MessageImage messageImage) {
        messageImageRepository.delete(messageImage);
    }

    @Override
    public void deleteById(long id) {
        messageImageRepository.deleteById(id);
    }

    @Override
    public long count() {
        return messageImageRepository.count();
    }

}

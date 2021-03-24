package com.example.controller;

import com.example.entities.Message;
import com.example.services.MessageService;
import com.example.services.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MessageController extends BaseController implements IGenericController<Message> {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
       this.messageService = messageService;
    }

    @Override
    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getAll() {
        try {
            return ResponseEntity.ok(messageService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @PostMapping("/messages")
    public ResponseEntity save(Message entity) {
        try {
            return ResponseEntity.ok(messageService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/messages/{id}")
    public ResponseEntity getById(Long id) {
        try {
            return ResponseEntity.ok(messageService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

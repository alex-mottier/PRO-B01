package com.example.controller;

import com.example.entities.Tag;
import com.example.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagController extends BaseController implements IGenericController<Tag> {

    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @Override
    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAll() {
        try {
            return ResponseEntity.ok(tagService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }    }

    @Override
    @PostMapping("/tags")
    public ResponseEntity<Tag> save(Tag entity) {
        try {
            return ResponseEntity.ok(tagService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/tags/{id}")
    public ResponseEntity getById(Long id) {
        try {
            return ResponseEntity.ok(tagService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

package com.example.controller;

import com.example.entities.Meeting;
import com.example.services.MeetingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MeetingController extends BaseController implements IGenericController<Meeting> {


    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @Override
    public ResponseEntity<List<Meeting>> getAll() {
        try {
            return ResponseEntity.ok(meetingService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity save(Meeting entity) {
        try {
            return ResponseEntity.ok(meetingService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity getById(Long id) {
        try {
            return ResponseEntity.ok(meetingService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

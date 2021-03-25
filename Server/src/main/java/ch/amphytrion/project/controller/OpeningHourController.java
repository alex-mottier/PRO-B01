package com.example.controller;

import com.example.entities.OpeningHour;
import com.example.services.OpeningHourService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OpeningHourController extends BaseController implements IGenericController<OpeningHour> {

    private final OpeningHourService openingHourService;

    public OpeningHourController(OpeningHourService openingHourService) {
        this.openingHourService = openingHourService;
    }

    @Override
    public ResponseEntity<List<OpeningHour>> getAll() {
        try {
            return ResponseEntity.ok(openingHourService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity save(OpeningHour entity) {
        try {
            return ResponseEntity.ok(openingHourService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity getById(Long id) {
        try {
            return ResponseEntity.ok(openingHourService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

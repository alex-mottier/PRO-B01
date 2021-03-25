package com.example.controller;

import com.example.entities.Location;
import com.example.services.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LocationController extends BaseController implements IGenericController<Location> {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @Override
    public ResponseEntity<List<Location>> getAll() {
        try {
            return ResponseEntity.ok(locationService.findAll());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ResponseEntity save(Location entity) {
        try {
            return ResponseEntity.ok(locationService.save(entity));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ResponseEntity getById(Long id) {

        try {
            return ResponseEntity.ok(locationService.findById(id));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}

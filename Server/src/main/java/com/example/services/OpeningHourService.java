package com.example.services;

import com.example.entities.OpeningHour;
import com.example.repositories.OpeningHourRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OpeningHourService implements IGenericService<OpeningHour> {

    private OpeningHourRepository openingHourRepository;

    public OpeningHourService(OpeningHourRepository openingHourRepository) {
        this.openingHourRepository = openingHourRepository;
    }

    @Override
    public List<OpeningHour> findAll() {
        return openingHourRepository.findAll();
    }

    @Override
    public OpeningHour save(OpeningHour openingHour) {
        return openingHourRepository.save(openingHour);
    }

    @Override
    public OpeningHour findById(long id) {
        try {
            return openingHourRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(OpeningHour openingHour) {
        openingHourRepository.delete(openingHour);
    }

    @Override
    public void deleteById(long id) {
        openingHourRepository.deleteById(id);
    }

    @Override
    public long count() {
        return openingHourRepository.count();
    }

}

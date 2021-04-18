package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.OpeningHour;
import ch.amphytrion.project.repositories.OpeningHourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OpeningHourService implements IGenericService<OpeningHour> {

    private OpeningHourRepository openingHourRepository;

    @Autowired
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
    public OpeningHour findById(String id) {
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
    public void deleteById(String id) {
        openingHourRepository.deleteById(id);
    }

    @Override
    public long count() {
        return openingHourRepository.count();
    }

}

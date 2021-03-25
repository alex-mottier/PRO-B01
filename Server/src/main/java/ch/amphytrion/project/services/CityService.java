package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.City;
import ch.amphytrion.project.repositories.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements IGenericService<City> {

    private CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public List<City> findAll() {
        return cityRepository.findAll();
    }

    @Override
    public City save(City host) {
        return cityRepository.save(host);
    }

    @Override
    public City findById(long id) {
        try {
            return cityRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(City host) {
        cityRepository.delete(host);
    }

    @Override
    public void deleteById(long id) {
        cityRepository.deleteById(id);
    }

    @Override
    public long count() {
        return cityRepository.count();
    }

}

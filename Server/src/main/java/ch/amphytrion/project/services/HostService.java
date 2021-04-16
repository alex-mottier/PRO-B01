package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.Host;
import ch.amphytrion.project.repositories.HostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostService implements IGenericService<Host> {

    private HostRepository hostRepository;

    @Autowired
    public HostService(HostRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    @Override
    public List<Host> findAll() {
        return hostRepository.findAll();
    }

    @Override
    public Host save(Host host) {
        return hostRepository.save(host);
    }

    @Override
    public Host findById(String id) {
        try {
            return hostRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(Host host) {
        hostRepository.delete(host);
    }

    @Override
    public void deleteById(String id) {
        hostRepository.deleteById(id);
    }

    @Override
    public long count() {
        return hostRepository.count();
    }

}

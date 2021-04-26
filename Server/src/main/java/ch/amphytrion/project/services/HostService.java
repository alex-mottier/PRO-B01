package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.HostProfil;
import ch.amphytrion.project.repositories.HostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostService implements IGenericService<HostProfil> {

    private HostRepository hostRepository;

    @Autowired
    public HostService(HostRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    @Override
    public List<HostProfil> findAll() {
        return hostRepository.findAll();
    }

    @Override
    public HostProfil save(HostProfil hostProfil) {
        return hostRepository.save(hostProfil);
    }

    @Override
    public HostProfil findById(String id) {
        try {
            return hostRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(HostProfil hostProfil) {
        hostRepository.delete(hostProfil);
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

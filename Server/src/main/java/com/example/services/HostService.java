package com.example.services;

import com.example.entities.Host;
import com.example.repositories.HostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostService implements IGenericService<Host> {

    private HostRepository hostRepository;

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
    public Host findById(long id) {
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
    public void deleteById(long id) {
        hostRepository.deleteById(id);
    }

    @Override
    public long count() {
        return hostRepository.count();
    }

}

package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HostService {

    private UserRepository hostRepository;

    @Autowired
    public HostService(UserRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    public List<User> findAll() {
        return hostRepository.findAll()
                .stream()
                .filter(user -> user.getHostProfil() != null)
                .collect(Collectors.toList());
    }

    public User save(User host) {
        return hostRepository.save(host);
    }

    public User findById(String id) {
        try {
            return hostRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void delete(User host) {
        hostRepository.delete(host);
    }

    public void deleteById(String id) {
        hostRepository.deleteById(id);
    }

    public long count() {
        return hostRepository.count();
    }

}

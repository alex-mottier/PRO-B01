package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Contains all the logic of the host data management
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Service
public class HostService {
    private UserRepository hostRepository;

    /**
     * Host service constructor
     * @param hostRepository Repository of host class
     */
    @Autowired
    public HostService(UserRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    /**
     * Retrieve all Users
     * @return List<User> All users in database
     */
    public List<User> findAll() {
        return hostRepository.findAll()
                .stream()
                .filter(user -> user.getHostProfil() != null)
                .collect(Collectors.toList());
    }

    /**
     * Modify/Add user in database
     * @param host The user to update/create
     * @return User the modified/created user
     */
    public User save(User host) {
        return hostRepository.save(host);
    }

    /**
     * find a user by its id
     * @param id The user to update/create
     * @return User the user found in database
     */
    public User findById(String id) {
        try {
            return hostRepository.findByIdAndHostProfilIsNotNull(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * delete a specified user
     * @param host The user to delete
     */
    public void delete(User host) {
        hostRepository.delete(host);
    }

    /**
     * delete a specific user
     * @param id The id of the user to delete
     */
    public void deleteById(String id) {
        hostRepository.deleteById(id);
    }

}

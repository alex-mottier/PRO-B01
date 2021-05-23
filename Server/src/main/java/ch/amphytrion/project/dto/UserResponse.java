package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.User;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
public class UserResponse implements InterfaceDTO {
    public String username;
    public String id;
    public Boolean isStudent;

    public UserResponse(User user) {
        this.username = user.getUsername();
        this.id = user.getId();
        if(user.getStudentProfil() != null) {
            isStudent = true;
        } else {
            isStudent = false;
        }
    }
}

package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.User;

import java.util.Objects;

/**
 * user RESTful response class
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserResponse that = (UserResponse) o;
        return username.equals(that.username) && Objects.equals(id, that.id) && isStudent.equals(that.isStudent);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, id, isStudent);
    }
}

package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.User;

public class UserResponse implements InterfaceDTO {
    public String username;

    public UserResponse(User user) {
        this.username = user.getUsername();
    }
}

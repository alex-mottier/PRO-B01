package ch.amphytrion.project.dto;

import java.io.Serializable;

public class ConnectedUser implements Serializable {
    public String name;

    public ConnectedUser(String userName){
        this.name = userName;
    }
}

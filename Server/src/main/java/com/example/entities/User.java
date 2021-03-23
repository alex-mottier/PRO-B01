package com.example.entities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Utilisateur")
@Data
public class User {
    private String firstname;
    private String lastname;

    public User(String firstname, String lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

package com.example.neo4jEntities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

@Node("Utilisateur")
@Data
public class User {
    private String prenom;
    private String nom;

    public User(String prenom, String nom) {
        this.prenom = prenom;
        this.nom = nom;
    }
}

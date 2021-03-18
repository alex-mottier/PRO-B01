package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

@Node("Utilisateur")
public class Utilisateur {
    @Getter @Setter
    private String prenom;
    @Getter @Setter
    private String nom;

    public Utilisateur(String prenom, String nom) {
        this.prenom = prenom;
        this.nom = nom;
    }
}

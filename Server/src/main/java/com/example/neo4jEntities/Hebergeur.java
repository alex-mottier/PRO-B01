package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Hebergeur")
public class Hebergeur extends Utilisateur {
    @Getter @Setter
    private String prenom;
    @Getter @Setter
    private String nom;
    @Getter @Setter
    private Adresse adresse;
    @Getter @Setter
    private ArrayList<Tag> tags;
    @Getter @Setter
    private ArrayList<Lieu> lieux;

    public Hebergeur(String prenom, String nom, Adresse adresse, ArrayList<Tag> tags, ArrayList<Lieu> lieux) {
        super(prenom, nom);
        this.adresse = adresse;
        this.tags = tags;
        this.lieux = lieux;
    }
}

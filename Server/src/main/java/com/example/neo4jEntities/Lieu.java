package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Lieu")
public class Lieu {
    @Getter @Setter
    private Hebergeur hebergeur;
    @Getter @Setter
    private Adresse adresse;
    @Getter @Setter
    private ArrayList<Reunion> reunions;
    @Getter @Setter
    private ArrayList<Tag> tags;
    @Getter @Setter
    private ArrayList<HoraireOuverture> horaireOuvertures;
    @Getter @Setter
    private String nom;

    public Lieu(Hebergeur hebergeur, Adresse adresse, ArrayList<Reunion> reunions, ArrayList<Tag> tags,
                ArrayList<HoraireOuverture> horaireOuvertures, String nom) {
        this.hebergeur = hebergeur;
        this.adresse = adresse;
        this.reunions = reunions;
        this.tags = tags;
        this.horaireOuvertures = horaireOuvertures;
        this.nom = nom;
    }
}

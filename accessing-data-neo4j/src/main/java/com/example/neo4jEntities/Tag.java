package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Tag")

public class Tag {
    @Getter @Setter
    private ArrayList<Reunion> reunions;
    @Getter @Setter
    private ArrayList<Lieu> lieux;
    @Getter @Setter
    private ArrayList<Hebergeur> hebergeurs;
    @Getter @Setter
    private String nom;

    public Tag(ArrayList<Reunion> reunions, ArrayList<Lieu> lieux, ArrayList<Hebergeur> hebergeurs, String nom) {
        this.reunions = reunions;
        this.lieux = lieux;
        this.hebergeurs = hebergeurs;
        this.nom = nom;
    }
}

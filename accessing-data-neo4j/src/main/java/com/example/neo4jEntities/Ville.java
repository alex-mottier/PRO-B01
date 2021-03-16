package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Ville")
public class Ville {
    @Getter @Setter
    private ArrayList<Adresse> adresses;
    @Getter @Setter
    private String nom;
    @Getter @Setter
    private Integer npa;

    public Ville(ArrayList<Adresse> adresses, String nom, Integer npa) {
        this.adresses = adresses;
        this.nom = nom;
        this.npa = npa;
    }
}

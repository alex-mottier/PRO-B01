package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Ville")
public class City {
    @Getter @Setter
    private ArrayList<Address> adresses;
    @Getter @Setter
    private String nom;
    @Getter @Setter
    private Integer npa;

    public City(ArrayList<Address> adresses, String nom, Integer npa) {
        this.adresses = adresses;
        this.nom = nom;
        this.npa = npa;
    }
}

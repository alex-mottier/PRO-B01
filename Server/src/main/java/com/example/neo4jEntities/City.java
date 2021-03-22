package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Ville")
@Data
public class City {
    private ArrayList<Address> adresses;
    private String nom;
    private Integer npa;

    public City(ArrayList<Address> adresses, String nom, Integer npa) {
        this.adresses = adresses;
        this.nom = nom;
        this.npa = npa;
    }
}

package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Hebergeur")
@Data
public class Host extends User {
    private String prenom;
    private String nom;
    private Address address;
    private ArrayList<Tag> tags;
    private ArrayList<Location> lieuxes;

    public Host(String prenom, String nom, Address address, ArrayList<Tag> tags, ArrayList<Location> lieuxes) {
        super(prenom, nom);
        this.address = address;
        this.tags = tags;
        this.lieuxes = lieuxes;
    }
}

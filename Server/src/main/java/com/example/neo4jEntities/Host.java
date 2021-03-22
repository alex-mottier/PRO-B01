package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Hebergeur")
public class Host extends User {
    @Getter @Setter
    private String prenom;
    @Getter @Setter
    private String nom;
    @Getter @Setter
    private Address address;
    @Getter @Setter
    private ArrayList<Tag> tags;
    @Getter @Setter
    private ArrayList<Location> lieuxes;

    public Host(String prenom, String nom, Address address, ArrayList<Tag> tags, ArrayList<Location> lieuxes) {
        super(prenom, nom);
        this.address = address;
        this.tags = tags;
        this.lieuxes = lieuxes;
    }
}

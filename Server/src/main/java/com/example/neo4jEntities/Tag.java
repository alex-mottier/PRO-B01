package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Tag")

public class Tag {
    @Getter @Setter
    private ArrayList<Meeting> meetings;
    @Getter @Setter
    private ArrayList<Location> lieuxes;
    @Getter @Setter
    private ArrayList<Host> hosts;
    @Getter @Setter
    private String nom;

    public Tag(ArrayList<Meeting> meetings, ArrayList<Location> lieuxes, ArrayList<Host> hosts, String nom) {
        this.meetings = meetings;
        this.lieuxes = lieuxes;
        this.hosts = hosts;
        this.nom = nom;
    }
}

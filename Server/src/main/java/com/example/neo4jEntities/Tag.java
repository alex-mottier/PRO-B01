package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Tag")
@Data
public class Tag {
    private ArrayList<Meeting> meetings;
    private ArrayList<Location> lieuxes;
    private ArrayList<Host> hosts;
    private String nom;

    public Tag(ArrayList<Meeting> meetings, ArrayList<Location> lieuxes, ArrayList<Host> hosts, String nom) {
        this.meetings = meetings;
        this.lieuxes = lieuxes;
        this.hosts = hosts;
        this.nom = nom;
    }
}

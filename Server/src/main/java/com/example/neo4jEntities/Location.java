package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Lieu")
public class Location {
    @Getter @Setter
    private Host host;
    @Getter @Setter
    private Address address;
    @Getter @Setter
    private ArrayList<Meeting> meetings;
    @Getter @Setter
    private ArrayList<Tag> tags;
    @Getter @Setter
    private ArrayList<OpeningHour> openingHours;
    @Getter @Setter
    private String nom;

    public Location(Host host, Address address, ArrayList<Meeting> meetings, ArrayList<Tag> tags,
                    ArrayList<OpeningHour> openingHours, String nom) {
        this.host = host;
        this.address = address;
        this.meetings = meetings;
        this.tags = tags;
        this.openingHours = openingHours;
        this.nom = nom;
    }
}

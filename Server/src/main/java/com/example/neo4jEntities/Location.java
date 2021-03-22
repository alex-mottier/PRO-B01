package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Lieu")
@Data
public class Location {
    private Host host;
    private Address address;
    private ArrayList<Meeting> meetings;
    private ArrayList<Tag> tags;
    private ArrayList<OpeningHour> openingHours;
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

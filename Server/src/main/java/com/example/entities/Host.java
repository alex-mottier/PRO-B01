package com.example.entities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;

@Node("Hebergeur")
@Data
public class Host extends User {
    private String firstname;
    private String lastname;
    private Address address;
    private ArrayList<Tag> tags;
    private ArrayList<Location> locations;

    public Host(String firstname, String lastname, Address address, ArrayList<Tag> tags, ArrayList<Location> locations) {
        super(firstname, lastname);
        this.address = address;
        this.tags = tags;
        this.locations = locations;
    }
}

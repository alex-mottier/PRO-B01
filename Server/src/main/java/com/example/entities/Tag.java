package com.example.entities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;

@Node("Tag")
@Data
public class Tag {
    private ArrayList<Meeting> meetings;
    private ArrayList<Location> locations;
    private ArrayList<Host> hosts;
    private String name;

    public Tag(ArrayList<Meeting> meetings, ArrayList<Location> locations, ArrayList<Host> hosts, String name) {
        this.meetings = meetings;
        this.locations = locations;
        this.hosts = hosts;
        this.name = name;
    }
}

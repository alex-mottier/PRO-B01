package com.example.entities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;

@Node("Ville")
@Data
public class City {
    private ArrayList<Address> adresses;
    private String name;
    private Integer zip;

    public City(ArrayList<Address> adresses, String name, Integer zip) {
        this.adresses = adresses;
        this.name = name;
        this.zip = zip;
    }
}

package com.example.entities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Adresse")
@Data
public class Address {
    private String street;
    private Integer streetNr;
    private City city;
    private Host host;
    private Location location;

    public Address(String street, Integer streetNr, City city, Host host, Location location) {
        this.street = street;
        this.streetNr = streetNr;
        this.city = city;
        this.host = host;
        this.location = location;
    }
}

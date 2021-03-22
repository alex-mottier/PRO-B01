package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Adresse")
@Data
public class Address {
    private String rue;
    private Integer nrRue;
    private City city;
    private Host host;
    private Location location;

    public Address(String rue, Integer nrRue, City city, Host host, Location location) {
        this.rue = rue;
        this.nrRue = nrRue;
        this.city = city;
        this.host = host;
        this.location = location;
    }
}

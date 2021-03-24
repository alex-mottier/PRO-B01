package com.example.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.neo4j.core.schema.Node;

@AllArgsConstructor
@Data
@Document
public class Address {
    private String street;
    private Integer streetNr;
    private City city;
    private Host host;
    private Location location;
}

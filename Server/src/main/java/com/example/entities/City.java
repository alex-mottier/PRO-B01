package com.example.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class City {
    private ArrayList<Address> adresses;
    private String name;
    private Integer zip;

}

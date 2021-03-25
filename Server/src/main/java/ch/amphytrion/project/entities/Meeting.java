package com.example.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class Meeting {
    private ArrayList<Student> partStudents;
    private Student orgStudent;
    private ArrayList<Location> locations;
    private ArrayList<Tag> tags;
    private Chat chat;
    private String name;
    private Integer repetitionsNb;
    private Integer frequencyNb;

}

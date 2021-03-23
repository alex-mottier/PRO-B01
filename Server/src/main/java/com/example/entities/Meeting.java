package com.example.entities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;

@Node("Reunion")
@Data
public class Meeting {
    private ArrayList<Student> partStudents;
    private Student orgStudent;
    private ArrayList<Location> locations;
    private ArrayList<Tag> tags;
    private Chat chat;
    private String name;
    private Integer repetitionsNb;
    private Integer frequencyNb;

    public Meeting(ArrayList<Student> partStudents, Student orgStudent,
                   ArrayList<Location> locations, ArrayList<Tag> tags, Chat chat,
                   String name, Integer repetitionsNb, Integer frequencyNb) {
        this.partStudents = partStudents;
        this.orgStudent = orgStudent;
        this.locations = locations;
        this.tags = tags;
        this.chat = chat;
        this.name = name;
        this.repetitionsNb = repetitionsNb;
        this.frequencyNb = frequencyNb;
    }
}

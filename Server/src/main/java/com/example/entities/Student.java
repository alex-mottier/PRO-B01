package com.example.entities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;

@Node("Etudiant")
@Data
public class Student extends User {
    private String firstname;
    private String lastname;
    private ArrayList<Message> messages;
    private ArrayList<Meeting> meetingsParticipations;
    private ArrayList<Meeting> meetingsOwner;

    public Student(String firstname, String lastname, ArrayList<Message> messages, ArrayList<Meeting> meetingsParticipations,
                   ArrayList<Meeting> meetingsOwner) {
        super(firstname, lastname);
        this.messages = messages;
        this.meetingsParticipations = meetingsParticipations;
        this.meetingsOwner = meetingsOwner;
    }
}

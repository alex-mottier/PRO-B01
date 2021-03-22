package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Etudiant")
public class Student extends User {
    @Getter @Setter
    private String prenom;
    @Getter @Setter
    private String nom;
    @Getter @Setter
    private ArrayList<Message> messages;
    @Getter @Setter
    private ArrayList<Meeting> reunionsParticipe;
    @Getter @Setter
    private ArrayList<Meeting> reunionsOrganisee;

    public Student(String prenom, String nom, ArrayList<Message> messages, ArrayList<Meeting> reunionsParticipe,
                   ArrayList<Meeting> reunionsOrganisee) {
        super(prenom, nom);
        this.messages = messages;
        this.reunionsParticipe = reunionsParticipe;
        this.reunionsOrganisee = reunionsOrganisee;
    }
}

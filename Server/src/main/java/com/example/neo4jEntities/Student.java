package com.example.neo4jEntities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Etudiant")
@Data
public class Student extends User {
    private String prenom;
    private String nom;
    private ArrayList<Message> messages;
    private ArrayList<Meeting> reunionsParticipe;
    private ArrayList<Meeting> reunionsOrganisee;

    public Student(String prenom, String nom, ArrayList<Message> messages, ArrayList<Meeting> reunionsParticipe,
                   ArrayList<Meeting> reunionsOrganisee) {
        super(prenom, nom);
        this.messages = messages;
        this.reunionsParticipe = reunionsParticipe;
        this.reunionsOrganisee = reunionsOrganisee;
    }
}

package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Reunion")
@Data
public class Meeting {
    private ArrayList<Student> elevesParticipants;
    private Student eleveOrganisteur;
    private ArrayList<Location> lieuxes;
    private ArrayList<Tag> tags;
    private Chat chat;
    private String nom;
    private Integer nbRepetitions;
    private Integer nbFrequence;

    public Meeting(ArrayList<Student> elevesParticipants, Student eleveOrganisteur,
                   ArrayList<Location> lieuxes, ArrayList<Tag> tags, Chat chat,
                   String nom, Integer nbRepetitions, Integer nbFrequence) {
        this.elevesParticipants = elevesParticipants;
        this.eleveOrganisteur = eleveOrganisteur;
        this.lieuxes = lieuxes;
        this.tags = tags;
        this.chat = chat;
        this.nom = nom;
        this.nbRepetitions = nbRepetitions;
        this.nbFrequence = nbFrequence;
    }
}

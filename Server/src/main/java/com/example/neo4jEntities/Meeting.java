package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Reunion")
public class Meeting {
    @Getter @Setter
    private ArrayList<Student> elevesParticipants;
    @Getter @Setter
    private Student eleveOrganisteur;
    @Getter @Setter
    private ArrayList<Location> lieuxes;
    @Getter @Setter
    private ArrayList<Tag> tags;
    @Getter @Setter
    private Chat chat;
    @Getter @Setter
    private String nom;
    @Getter @Setter
    private Integer nbRepetitions;
    @Getter @Setter
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

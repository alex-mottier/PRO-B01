package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Reunion")
public class Reunion {
    @Getter @Setter
    private ArrayList<Etudiant> elevesParticipants;
    @Getter @Setter
    private Etudiant eleveOrganisteur;
    @Getter @Setter
    private ArrayList<Lieu> lieux;
    @Getter @Setter
    private ArrayList<Tag> tags;
    @Getter @Setter
    private Conversation conversation;
    @Getter @Setter
    private String nom;
    @Getter @Setter
    private Integer nbRepetitions;
    @Getter @Setter
    private Integer nbFrequence;

    public Reunion(ArrayList<Etudiant> elevesParticipants, Etudiant eleveOrganisteur,
                   ArrayList<Lieu> lieux, ArrayList<Tag> tags, Conversation conversation,
                   String nom, Integer nbRepetitions, Integer nbFrequence) {
        this.elevesParticipants = elevesParticipants;
        this.eleveOrganisteur = eleveOrganisteur;
        this.lieux = lieux;
        this.tags = tags;
        this.conversation = conversation;
        this.nom = nom;
        this.nbRepetitions = nbRepetitions;
        this.nbFrequence = nbFrequence;
    }
}

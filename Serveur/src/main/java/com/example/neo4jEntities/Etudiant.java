package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Node("Etudiant")
public class Etudiant extends Utilisateur {
    @Getter @Setter
    private String prenom;
    @Getter @Setter
    private String nom;
    @Getter @Setter
    private ArrayList<Message> messages;
    @Getter @Setter
    private ArrayList<Reunion> reunionsParticipe;
    @Getter @Setter
    private ArrayList<Reunion> reunionsOrganisee;

    public Etudiant(String prenom, String nom, ArrayList<Message> messages, ArrayList<Reunion> reunionsParticipe,
                    ArrayList<Reunion> reunionsOrganisee) {
        super(prenom, nom);
        this.messages = messages;
        this.reunionsParticipe = reunionsParticipe;
        this.reunionsOrganisee = reunionsOrganisee;
    }
}

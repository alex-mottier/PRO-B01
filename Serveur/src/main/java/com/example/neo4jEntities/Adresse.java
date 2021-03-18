package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;
@Node("Adresse")
public class Adresse {
    //TODO ajouter les annotations, @Id pour les id @Property pour le nom, @Relationship pour les relations
    //TODO : Ajout de lombok dans les technologies
    @Getter @Setter
    private String rue;
    @Getter @Setter
    private Integer nrRue;
    @Getter @Setter
    private Ville ville;
    @Getter @Setter
    private Hebergeur hebergeur;
    @Getter @Setter
    private Lieu lieu;

    public Adresse(String rue, Integer nrRue, Ville ville, Hebergeur hebergeur, Lieu lieu) {
        this.rue = rue;
        this.nrRue = nrRue;
        this.ville = ville;
        this.hebergeur = hebergeur;
        this.lieu = lieu;
    }
}

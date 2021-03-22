package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;
@Node("Adresse")
public class Address {
    //TODO ajouter les annotations, @Id pour les id @Property pour le nom, @Relationship pour les relations
    //TODO : Ajout de lombok dans les technologies
    @Getter @Setter
    private String rue;
    @Getter @Setter
    private Integer nrRue;
    @Getter @Setter
    private City city;
    @Getter @Setter
    private Host host;
    @Getter @Setter
    private Location location;

    public Address(String rue, Integer nrRue, City city, Host host, Location location) {
        this.rue = rue;
        this.nrRue = nrRue;
        this.city = city;
        this.host = host;
        this.location = location;
    }
}

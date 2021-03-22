package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Node("HoraireOuverture")
public class OpeningHour {
    public enum Jour {
        LUNDI,MARDI,MERCREDI,JEUDI,VENDREDI,SAMEDI,DIMANCHE
    }
    @Getter @Setter
    private Jour jour;
    @Getter @Setter
    private LocalDateTime heureDebut;
    @Getter @Setter
    private LocalDateTime heureFin;
    @Getter @Setter
    private Location location;

    public OpeningHour(Jour jour, LocalDateTime heureDebut, LocalDateTime heureFin, Location location) {
        this.jour = jour;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.location = location;
    }
}

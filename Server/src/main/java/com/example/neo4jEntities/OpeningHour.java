package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Node("HoraireOuverture")
@Data
public class OpeningHour {
    public enum Jour {
        LUNDI,MARDI,MERCREDI,JEUDI,VENDREDI,SAMEDI,DIMANCHE
    }
    private Jour jour;
    private LocalDateTime heureDebut;
    private LocalDateTime heureFin;
    private Location location;

    public OpeningHour(Jour jour, LocalDateTime heureDebut, LocalDateTime heureFin, Location location) {
        this.jour = jour;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.location = location;
    }
}

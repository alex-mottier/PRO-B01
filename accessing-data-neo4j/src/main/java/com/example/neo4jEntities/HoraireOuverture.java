package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Node("HoraireOuverture")
public class HoraireOuverture {
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
    private Lieu lieu;

    public HoraireOuverture(Jour jour, LocalDateTime heureDebut, LocalDateTime heureFin, Lieu lieu) {
        this.jour = jour;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.lieu = lieu;
    }
}

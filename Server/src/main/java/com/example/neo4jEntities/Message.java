package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Node("Message")
public class Message {
    @Getter @Setter
    private Etudiant etudiant;
    @Getter @Setter
    private Conversation conversation;
    @Getter @Setter
    private String texte;
    @Getter @Setter
    private Date date;

    public Message(Etudiant etudiant, Conversation conversation, String texte, Date date) {
        this.etudiant = etudiant;
        this.conversation = conversation;
        this.texte = texte;
        this.date = date;
    }
}

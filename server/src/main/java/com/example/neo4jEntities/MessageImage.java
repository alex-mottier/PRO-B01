package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Node("MessageImage")
public class MessageImage extends Message {
    @Getter @Setter
    private Integer height;
    @Getter @Setter
    private Integer width;
    @Getter @Setter
    private String link;

    public MessageImage(Etudiant etudiant, Conversation conversation, String texte, Date date, Integer height, Integer width, String link) {
        super(etudiant, conversation, texte, date);
        this.height = height;
        this.width = width;
        this.link = link;
    }
}
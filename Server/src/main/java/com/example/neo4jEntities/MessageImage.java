package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Node("MessageImage")
@Data
public class MessageImage extends Message {
    private Integer height;
    private Integer width;
    private String link;

    public MessageImage(Student student, Chat chat, String texte, Date date, Integer height, Integer width, String link) {
        super(student, chat, texte, date);
        this.height = height;
        this.width = width;
        this.link = link;
    }
}

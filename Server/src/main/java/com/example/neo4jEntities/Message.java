package com.example.neo4jEntities;

import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Node("Message")
public class Message {
    @Getter @Setter
    private Student student;
    @Getter @Setter
    private Chat chat;
    @Getter @Setter
    private String texte;
    @Getter @Setter
    private Date date;

    public Message(Student student, Chat chat, String texte, Date date) {
        this.student = student;
        this.chat = chat;
        this.texte = texte;
        this.date = date;
    }
}

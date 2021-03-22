package com.example.neo4jEntities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Node("Message")
@Data
public class Message {
    private Student student;
    private Chat chat;
    private String texte;
    private Date date;

    public Message(Student student, Chat chat, String texte, Date date) {
        this.student = student;
        this.chat = chat;
        this.texte = texte;
        this.date = date;
    }
}

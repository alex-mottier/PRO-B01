package com.example.entities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.Date;

@Node("Message")
@Data
public class Message {
    private Student student;
    private Chat chat;
    private String text;
    private Date date;

    public Message(Student student, Chat chat, String text, Date date) {
        this.student = student;
        this.chat = chat;
        this.text = text;
        this.date = date;
    }
}

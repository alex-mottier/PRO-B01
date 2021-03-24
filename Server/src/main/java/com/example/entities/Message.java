package com.example.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Message {
    private Student student;
    private Chat chat;
    private String text;
    private Date date;
}

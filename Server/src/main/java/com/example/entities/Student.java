package com.example.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@Document
public class Student extends User {
    @Field("studentFirstname")
    private String firstname;
    @Field("studentLastname")
    private String lastname;
    private ArrayList<Message> messages;
    private ArrayList<Meeting> meetingsParticipations;
    private ArrayList<Meeting> meetingsOwner;


}

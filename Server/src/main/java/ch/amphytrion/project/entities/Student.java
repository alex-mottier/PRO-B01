package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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
    @Field("studentUsername")
    private String username;
    private ArrayList<Message> messages;
    private ArrayList<Meeting> meetingsParticipations;
    private ArrayList<Meeting> meetingsOwner;


}

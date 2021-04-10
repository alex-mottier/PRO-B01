package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Student extends User {
    //private String id;
    @Field("studentFirstname")
    private String firstname;
    @Field("studentLastname")
    private String lastname;
    @Field("studentUsername")
    private String username;
    @Field("email")
    private String email;

    public Student(String username){
        this.username = username;
    }
    public Student(User user){
        this.username = user.getUsername();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.email = user.getEmail();
    }

}

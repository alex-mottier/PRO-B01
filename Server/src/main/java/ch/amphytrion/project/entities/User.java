package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.neo4j.core.schema.Node;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
    @Id
    private String id;
    @Field("Username")
    private String username;
    @Field("UserFirstname")
    private String firstname;
    @Field("UserLastname")
    private String lastname;
    @Field("UserEmail")
    private String email;

    public User(String username){
        this.username = username;
    }


}

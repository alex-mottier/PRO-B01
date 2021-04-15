package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Id;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
//@Node("User")
public class User {
   // @Id
    private String id;
    @Field("Username")
    private String username;
    @Field("UserFirstname")
    private String firstname;
    @Field("UserLastname")
    private String lastname;

    public User(String username){
        this.username = username;
    }


}

package ch.amphytrion.project.entities;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
public class Host extends User {
    private String firstname;
    private String lastname;
    private String username;
    private Address address;
    private ArrayList<Tag> tags;
    private ArrayList<Location> locations;

    @Builder
    public Host(String firstname, String lastname, String username, Address address, ArrayList<Tag> tags, ArrayList<Location> locations) {
        super(username);
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.tags = tags;
        this.locations = locations;
    }
}

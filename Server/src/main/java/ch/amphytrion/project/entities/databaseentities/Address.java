package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Address {
    @Id
    private String id;
    private String street;
    private String streetNb;
    private City city;
    private Host host;

    public Address(String street, String streetNb, City city, Host host) {
        this.street = street;
        this.streetNb = streetNb;
        this.city = city;
        this.host = host;
    }
}

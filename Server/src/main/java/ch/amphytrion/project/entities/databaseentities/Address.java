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
    private Integer streetNr;
    private City city;
    private Host host;
    private Location location;

    public Address(String street, Integer streetNr, City city, Host host, Location location) {
        this.street = street;
        this.streetNr = streetNr;
        this.city = city;
        this.host = host;
        this.location = location;
    }
}

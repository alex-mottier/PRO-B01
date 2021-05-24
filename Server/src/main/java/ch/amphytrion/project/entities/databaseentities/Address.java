package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Address class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
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

    public Address(String street, String streetNb, City city) {
        this.street = street;
        this.streetNb = streetNb;
        this.city = city;
    }
}

package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(id, address.id) && street.equals(address.street) && streetNb.equals(address.streetNb) && city.equals(address.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, street, streetNb, city);
    }
}

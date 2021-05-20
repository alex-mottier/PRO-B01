package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class City {
    @Id
    private String id;
    private String name;
    private String zip;

    public City(String name, String zip) {
        this.name = name;
        this.zip = zip;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        City city = (City) o;
        return Objects.equals(id, city.id) && name.equals(city.name) && zip.equals(city.zip);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, zip);
    }
}

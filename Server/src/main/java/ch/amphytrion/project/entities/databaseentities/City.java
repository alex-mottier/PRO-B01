package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

/**
 * City class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
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
}

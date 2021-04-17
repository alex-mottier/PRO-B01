package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class City {
    @Id
    private String id;
    private ArrayList<Address> adresses;
    private String name;
    private Integer zip;

    public City(ArrayList<Address> adresses, String name, Integer zip) {
        this.adresses = adresses;
        this.name = name;
        this.zip = zip;
    }
}

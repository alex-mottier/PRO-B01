package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@Data
@Document
public class Address {
    private String street;
    private Integer streetNr;
    private City city;
    private Host host;
    private Location location;
}

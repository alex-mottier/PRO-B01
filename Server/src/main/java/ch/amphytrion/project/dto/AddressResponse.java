package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.City;
import ch.amphytrion.project.entities.databaseentities.Host;
import ch.amphytrion.project.entities.databaseentities.Location;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
public class AddressResponse {
    private String id;
    private String street;
    private String streetNb;
    private String cityName;
    private String npa;

}

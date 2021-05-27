package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * HostProfil class, used in User class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Data
@AllArgsConstructor
public class HostProfil {
    private Address address;
    private String description;
    private List<Tag> tags= new ArrayList<>();
    private CovidData covidData;
    public HostProfil(){ }
}

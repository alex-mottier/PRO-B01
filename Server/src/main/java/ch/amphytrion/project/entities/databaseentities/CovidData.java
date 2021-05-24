package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * CovidData class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class CovidData {
    private Boolean isOpen;
    private Boolean masksRequired;
    private Boolean disinfectionRequired;
    private String recommendedDistancing;
    private String comments;
}

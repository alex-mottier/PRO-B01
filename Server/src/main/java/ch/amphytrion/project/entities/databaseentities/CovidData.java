package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

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

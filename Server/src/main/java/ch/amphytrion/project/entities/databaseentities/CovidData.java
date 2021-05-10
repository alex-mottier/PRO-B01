package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class CovidData {
    @Id
    private String id;
    private Boolean isOpen;
    private Boolean masksRequired;
    private Boolean disinfectionRequired;
    private String recommendedDistancing;
    private String comments;

    public CovidData(Boolean isOpen, Boolean masksRequired, Boolean disinfectionRequired, String recommendedDistancing, String comments) {
        this.isOpen = isOpen;
        this.masksRequired = masksRequired;
        this.disinfectionRequired = disinfectionRequired;
        this.recommendedDistancing = recommendedDistancing;
        this.comments = comments;
    }
}

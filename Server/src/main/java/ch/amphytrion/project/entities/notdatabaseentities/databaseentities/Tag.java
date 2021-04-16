package ch.amphytrion.project.entities.apiresponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@Data
@Document
public class Tag {
    private String name;
}

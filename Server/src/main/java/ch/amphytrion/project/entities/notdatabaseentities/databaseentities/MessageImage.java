package ch.amphytrion.project.entities.apiresponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@AllArgsConstructor
public class MessageImage extends Message {
    private Integer height;
    private Integer width;
    private String link;
}

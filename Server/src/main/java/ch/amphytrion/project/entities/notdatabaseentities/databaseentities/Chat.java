package ch.amphytrion.project.entities.apiresponse;

import ch.amphytrion.project.entities.apiresponse.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class Chat {
    private String ID;
    private ArrayList<Message> messages;
}

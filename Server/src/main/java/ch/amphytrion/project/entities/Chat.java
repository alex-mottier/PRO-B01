package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class Chat {

    private ArrayList<Message> messages = new ArrayList<>();
    private Meeting meeting;
}

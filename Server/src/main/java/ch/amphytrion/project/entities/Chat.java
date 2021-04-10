package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Chat {
    @Id
    private String id;
    private ArrayList<Message> messages = new ArrayList<>();
    private Meeting meeting;

    public Chat(ArrayList<Message> messages, Meeting meeting) {
        this.messages = messages;
        this.meeting = meeting;
    }
}

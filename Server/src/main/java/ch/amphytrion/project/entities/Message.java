package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Message {
    @Id
    private String id;
    private Student student;
    private Chat chat;
    private String text;
    private Date date;

    public Message(Student student, Chat chat, String text, Date date) {
        this.student = student;
        this.chat = chat;
        this.text = text;
        this.date = date;
    }
}

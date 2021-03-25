package ch.amphytrion.project.entities;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document
public class MessageImage extends Message {
    private Integer height;
    private Integer width;
    private String link;

    @Builder
    public MessageImage(Student student, Chat chat, String text, Date date) {
        super(student, chat, text, date);
    }
}

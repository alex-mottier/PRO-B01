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
public class Meeting {
    @Id
    private String id;
    private ArrayList<Student> partStudents;
    private Student orgStudent;
    private ArrayList<Location> locations;
    private ArrayList<Tag> tags;
    private Chat chat;
    private String name;
    private Integer repetitionsNb;
    private Integer frequencyNb;

    public Meeting(ArrayList<Student> partStudents, Student orgStudent, ArrayList<Location> locations, ArrayList<Tag> tags, Chat chat, String name, Integer repetitionsNb, Integer frequencyNb) {
        this.partStudents = partStudents;
        this.orgStudent = orgStudent;
        this.locations = locations;
        this.tags = tags;
        this.chat = chat;
        this.name = name;
        this.repetitionsNb = repetitionsNb;
        this.frequencyNb = frequencyNb;
    }
}

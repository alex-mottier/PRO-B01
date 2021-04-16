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
public class Tag {
    @Id
    private String id;
    private ArrayList<Meeting> meetings;
    private ArrayList<Location> locations;
    private ArrayList<Host> hosts;
    private String name;

    public Tag(ArrayList<Meeting> meetings, ArrayList<Location> locations, ArrayList<Host> hosts, String name) {
        this.meetings = meetings;
        this.locations = locations;
        this.hosts = hosts;
        this.name = name;
    }
}

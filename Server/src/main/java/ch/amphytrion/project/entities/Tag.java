package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class Tag {
    private ArrayList<Meeting> meetings;
    private ArrayList<Location> locations;
    private ArrayList<Host> hosts;
    private String name;

}

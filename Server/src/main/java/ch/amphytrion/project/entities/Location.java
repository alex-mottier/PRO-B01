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
public class Location {
    @Id
    private String id;
    private Host host;
    private Address address;
    private City city;
    private ArrayList<Meeting> meetings;
    private ArrayList<Tag> tags;
    private ArrayList<OpeningHour> openingHours;
    private String name;

    public Location(Host host, Address address, City city, ArrayList<Meeting> meetings, ArrayList<Tag> tags, ArrayList<OpeningHour> openingHours, String name) {
        this.host = host;
        this.address = address;
        this.city = city;
        this.meetings = meetings;
        this.tags = tags;
        this.openingHours = openingHours;
        this.name = name;
    }
}

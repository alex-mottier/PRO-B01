package ch.amphytrion.project.entities.notdatabaseentities;

import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterRequest {
    private String name;
    private Date startDate;
    private Date endDate;
    private ArrayList<Tag> tags;
    private ArrayList<Location> locations;
}

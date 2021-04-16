package ch.amphytrion.project.entities.apiresponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data
@Document
@AllArgsConstructor
public class Host extends User {
    private Address address;
    private ArrayList<Tag> tags;
    private ArrayList<Location> locations;
}

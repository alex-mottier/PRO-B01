package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class HostProfil {
    private Address address;
    private String description;
    private ArrayList<Tag> tags;
}
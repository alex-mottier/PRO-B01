package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Tag;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Document
public class LocationResponse implements InterfaceDTO {
    @Id
    public String id;
    public String name;
    public String description;
    public Integer nbPeople;
    public String hostId;
    public String hostName;
    public List<Tag> tags;
    public List<OpeningHourResponse> openingHours;

    public LocationResponse(Location location, User user,  UserService userService) {
        User host = userService.findById(location.getHostId());
        List<OpeningHourResponse> openingHours = location.getOpeningHours()
                .stream()
                .map(op -> new OpeningHourResponse(op))
                .collect(Collectors.toList());
        this.id = location.getId();
        this.name = location.getName();
        this.description = location.getDescription();
        this.nbPeople = location.getNbPeople();
        this.hostId = host.getId();
        this.hostName = host.getUsername();
        this.tags = location.getTags();
        this.openingHours = openingHours;
    }
}

package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Tag;
import ch.amphytrion.project.services.LocationService;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

/**
 * Meeting RESTful response class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
public class MeetingResponse implements InterfaceDTO {
    @Id
    public String id;
    public String name;
    public String description;
    public String locationID;
    public String locationName;
    public String ownerID;
    public String chatID;
    public List<Tag> tags;
    public List<String> membersId;
    public Integer maxPeople;
    // Format ISO 8601
    public String startDate;
    public String endDate;
    public Boolean isPrivate;

    public MeetingResponse(Meeting meeting, LocationService locationService) {

        Location location = locationService.findById(meeting.getLocationID());

        this.id = meeting.getId();
        this.name = meeting.getName();
        this.description = meeting.getDescription();
        this.locationID = meeting.getLocationID();
        this.ownerID = meeting.getOwnerID();
        this.chatID = meeting.getChatID();
        this.tags = meeting.getTags();
        this.startDate = meeting.getStartDate();
        this.endDate = meeting.getEndDate();
        this.isPrivate = meeting.getIsPrivate();
        this.maxPeople = location.getNbPeople();
        this.locationName = location.getName();
        this.membersId = meeting.getMembersID();
    }
}

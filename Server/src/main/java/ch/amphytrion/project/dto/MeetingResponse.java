package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Tag;
import ch.amphytrion.project.services.LocationService;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    public MeetingResponse(Meeting meeting, Location location) {

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
        this.membersId = meeting.getMembersID();
        if(location != null){
            this.maxPeople = location.getNbPeople();
            this.locationName = location.getName();
        } else {
            this.maxPeople = 0;
            this.locationName = "";
        }

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MeetingResponse that = (MeetingResponse) o;
        return Objects.equals(id, that.id) && name.equals(that.name) && Objects.equals(description, that.description) && Objects.equals(locationID, that.locationID) && Objects.equals(locationName, that.locationName) && Objects.equals(ownerID, that.ownerID) && Objects.equals(chatID, that.chatID) && Objects.equals(tags, that.tags) && Objects.equals(membersId, that.membersId) && Objects.equals(maxPeople, that.maxPeople) && Objects.equals(startDate, that.startDate) && Objects.equals(endDate, that.endDate) && Objects.equals(isPrivate, that.isPrivate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, locationID, locationName, ownerID, chatID, tags, membersId, maxPeople, startDate, endDate, isPrivate);
    }
}

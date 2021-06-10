package ch.amphytrion.project.services;

import ch.amphytrion.project.dto.DatesFilterDTO;
import ch.amphytrion.project.dto.FilterRequest;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.repositories.LocationRepository;
import ch.amphytrion.project.repositories.MeetingRepository;
import ch.amphytrion.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Contains all the logic of the meeting data management
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Service
public class MeetingService implements IGenericService<Meeting> {

    private MeetingRepository meetingRepository;
    private UserRepository userRepository;
    private LocationRepository locationRepository;
    private ChatRepository chatRepository;
    private LocationService locationService;

    /**
     * Location service constructor
     * @param meetingRepository Repository of meeting class
     * @param locationRepository Repository of location class
     * @param chatRepository Repository of chat class
     * @param locationService Service of location class
     * @param userRepository Repository of user class
     */
    @Autowired
    public MeetingService(MeetingRepository meetingRepository, LocationRepository locationRepository, ChatRepository chatRepository, LocationService locationService, UserRepository userRepository) {
        this.meetingRepository = meetingRepository;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.locationRepository = locationRepository;
        this.locationService = locationService;
        this.userRepository = userRepository;
    }

    /**
     * Retrieve all the meetings of the database
     * @return List<Meeting> list of all the meetings of the database
     */
    @Override
    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    /**
     * Create/update meeting
     * @param meetingResponse the meeting to create/update
     * @return Meeting The meeting modified/created
     */
    @Override
    public Meeting save(Meeting meetingResponse) {
        if (meetingResponse.getId() != null && !meetingResponse.getId().isEmpty()) {
        }
        return meetingRepository.save(meetingResponse);
    }

    /**
     * Find a specific meeting
     * @param id The id of the meeting to find
     * @return Meeting The meeting found
     */
    @Override
    public Meeting findById(String id) {
        return meetingRepository.findById(id).orElse(null);
    }

    /**
     * Find a list of meetings by their owner id
     * @param ownerID The id of the owner of the meetings to find
     * @return Meeting The list of meetings found
     */
    public ArrayList<Meeting> findByOwnerID(String ownerID){
        return meetingRepository.findByOwnerID(ownerID);
    }

    /**
     * Find a meeting by its location
     * @param id the id of the location that has to be in the meeting
     * @return List<Meeting> a list of meeting having a specific location
     */
    public List<Meeting> findByLocationID(String id) {
        return meetingRepository.findByLocationID(id);
    }

    /**
     * Find a list of meetings by their owner id that haven't happened yet
     * @param ownerID The id of the owner of the meetings to find
     * @return Meeting The list of meetings found
     */
    public ArrayList<Meeting> findOwnerFutureMeetings(String ownerID) {
        ArrayList<Meeting> meetings = findByOwnerID(ownerID);
        ArrayList<Meeting> futureMeetings = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for(Meeting meeting : meetings) {
            String end = meeting.getEndDate();
            Instant instant = Instant.parse(end);
            LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
            if(dateTime.isAfter(now)) {
                futureMeetings.add(meeting);
            }
        }
        return futureMeetings;
    }

    /**
     * Delete a specified meeting
     * @param meetingResponse th meeting to delete
     */
    @Override
    public void delete(Meeting meetingResponse) {
        meetingRepository.delete(meetingResponse);
    }

    /**
     * Delete a specific meeting by its id
     * @param id the id of the meeting to find
     */
    @Override
    public void deleteById(String id) {
        meetingRepository.deleteById(id);
    }

    /**
     * add a student to a meeting
     * @param member the user to add as student
     * @param meetingID the id of the meeting to add a student to
     * @return Meeting the meeting updated
     */
    public Meeting addMemberToMeeting(User member, String meetingID) {
        try {
            StudentProfil studentProfil = member.getStudentProfil();
            Meeting meeting = findById(meetingID);
            // Check if student is already part of the meeting
            if (studentProfil == null
                    || meeting.getMembersID().contains(member.getId())) {
                return meeting;
            } else {
                Location location = locationService.findById(meeting.getLocationID());
                if (location != null && meeting.getMembersID().size() >= location.getNbPeople()){
                    return null;
                }
                meeting.getMembersID().add(member.getId());
                studentProfil.getMeetingsParticipationsID().add(meeting.getId());
                save(meeting);
                userRepository.save(member);
                return meeting;
            }
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * filter a list of meetings
     * @param meetings the meetings to filter
     * @param filter the filter to use
     * @return List<Meeting> a list of meetings filtered
     */
    public List<Meeting> allFilters(List<Meeting> meetings, FilterRequest filter) {
        return meetings.stream()
                .filter(meeting ->
                        filterByPrivate(meeting))
                .filter(meeting ->
                        filterByName(meeting, filter.name))
                .filter(meeting ->
                        filterByDateFilter(meeting, new DatesFilterDTO(filter.startDate, filter.endDate)))
                .filter(meeting ->
                        searchFilterTags(meeting, filter.tags))
                .filter(meeting ->
                        searchFilterLocations(meeting, filter.location))
                .collect(Collectors.toList());
    }
    /**
     * Check the name of a meeting
     * @param meeting the meeting to check
     * @param name the name to compare with
     * @return boolean true if the name corresponds
     */
    public boolean filterByName(Meeting meeting, String name) {
        if (name == null || name == "") {
            return true;
        } else {
            return meeting.getName().contains(name);
        }

    }

    /**
     * Check if a meeting is private
     * @param meeting the meeting to check
     * @return boolean true if the meeting is public
     */
    public boolean filterByPrivate(Meeting meeting) {
        return !meeting.getIsPrivate();
    }

    /**
     * Check if a meeting is between dates
     * @param meeting the meeting to check
     * @param datesFilter the dates
     * @return boolean true if the meeting is between dates
     */
    public boolean filterByDateFilter(Meeting meeting, DatesFilterDTO datesFilter){
        if (datesFilter == null) {
            return true;
        } else {
            return new DatesFilterDTO(meeting).isBetween(datesFilter);

        }
    }

    /**
     * Check if one of several tags is part of a meeting
     * @param meeting the meeting to check
     * @param tags a list of tags
     * @return boolean true if the meeting has one or more of the tags specified
     */
    public boolean searchFilterTags(Meeting meeting, List<Tag> tags){
        if (tags == null || tags.isEmpty()) {
            return true;
        } else {
            return CollectionUtils.containsAny(meeting.getTags(), tags);
        }
    }

    /**
     * Check if the filter has the location
     * @param meeting the meeting to check
     * @param location the location to check
     * @return boolean true if the meeting has the location specified
     */
    public boolean searchFilterLocations(Meeting meeting, Location location){
        if (location == null || location.getId() == null || location.getId() == "") {
            return true;
        } else {
            return meeting.getLocationID() == location.getId();
        }
    }

    /**
     * Return all future meeting at the location
     * @param locationID the id of the location
     * @return the list of meeting that will happens at the location
     */
    public List<Meeting> findAllWithLocation(String locationID){
        List<Meeting> meetings = findAll();
        ArrayList<Meeting> futureAtLocationMeetings = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for(Meeting meeting : meetings) {
            String end = meeting.getEndDate();
            Instant instant = Instant.parse(end);
            LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
            if(dateTime.isAfter(now) && meeting.getLocationID().equals(locationID)) {
                futureAtLocationMeetings.add(meeting);
            }
        }
        return futureAtLocationMeetings;
    }


}


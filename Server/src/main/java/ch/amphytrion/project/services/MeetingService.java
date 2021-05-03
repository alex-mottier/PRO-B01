package ch.amphytrion.project.services;

import ch.amphytrion.project.dto.DatesFilterDTO;
import ch.amphytrion.project.dto.FilterRequest;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.repositories.LocationRepository;
import ch.amphytrion.project.repositories.MeetingRepository;
import ch.amphytrion.project.repositories.UserRepository;
import org.joda.time.DateTime;
import org.joda.time.format.ISODateTimeFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MeetingService implements IGenericService<Meeting> {

    private MeetingRepository meetingRepository;
    private UserRepository userRepository;
    private LocationRepository locationRepository;
    private ChatRepository chatRepository;
    private LocationService locationService;

    @Autowired
    public MeetingService(MeetingRepository meetingRepository, LocationRepository locationRepository, ChatRepository chatRepository, LocationService locationService, UserRepository userRepository) {
        this.meetingRepository = meetingRepository;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.locationRepository = locationRepository;
        this.locationService = locationService;
        this.userRepository = userRepository;
    }

    @Override
    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    @Override
    public Meeting save(Meeting meetingResponse) {
        if (meetingResponse.getId() != null && !meetingResponse.getId().isEmpty()) {
        }
        return meetingRepository.save(meetingResponse);
    }

    @Override
    public Meeting findById(String id) {
        try {
            return meetingRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public ArrayList<Meeting> findByOwnerID(String ownerID){
        return meetingRepository.findByOwnerID(ownerID);
    }

    public ArrayList<Meeting> findFutureMeetings(String ownerID) {
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

    @Override
    public void delete(Meeting meetingResponse) {
        meetingRepository.delete(meetingResponse);
    }

    @Override
    public void deleteById(String id) {
        meetingRepository.deleteById(id);
    }

    @Override
    public long count() {
        return meetingRepository.count();
    }

    public Meeting addMemberToMeeting(User member, String meetingID) {
        try {
            StudentProfil studentProfil = member.getStudentProfil();
            Meeting meeting = findById(meetingID);
            if (studentProfil == null
                    || meeting.getMembersID().contains(member.getId())
                    || meeting.getMembersID().size() >= meeting.getNbPeople()) {
                return null;
            } else {
                meeting.getMembersID().add(member.getId());
                meeting.setNbPeople(meeting.getNbPeople() + 1);
                studentProfil.getMeetingsParticipationsID().add(meeting.getId());
                save(meeting);
                userRepository.save(member);
                return meeting;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public List<Meeting> allFilters(List<Meeting> meetings, FilterRequest filter) {
        return meetings.stream()
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

    public boolean filterByName(Meeting meeting, String name) {
        if (name == null || name == "") {
            return true;
        } else {
            return  meeting.getName().contains(name);
        }

    }

    public boolean filterByDateFilter(Meeting meeting, DatesFilterDTO datesFilter){
        if (datesFilter == null) {
            return true;
        } else {
            return new DatesFilterDTO(meeting).isBetween(datesFilter);

        }
    }

    public boolean searchFilterTags(Meeting meeting, List<Tag> tags){
        if (tags == null || tags.isEmpty()) {
            return true;
        } else {
            return CollectionUtils.containsAny(meeting.getTags(), tags);
        }
    }

    public boolean searchFilterLocations(Meeting meeting, Location location){
        if (location == null || location.getId() == null || location.getId() == "") {
            return true;
        } else {
            return meeting.getLocationID() == location.getId();
        }
    }
}


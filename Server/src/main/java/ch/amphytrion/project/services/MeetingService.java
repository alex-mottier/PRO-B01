package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Tag;
import ch.amphytrion.project.dto.FilterRequest;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.repositories.LocationRepository;
import ch.amphytrion.project.repositories.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MeetingService implements IGenericService<Meeting> {

    private MeetingRepository meetingRepository;
    private LocationRepository locationRepository;
    private ChatRepository chatRepository;

    @Autowired
    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    @Override
    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    @Override
    public Meeting save(Meeting meetingResponse) {
        if (meetingResponse.getId() != null && !meetingResponse.getId().isEmpty()) {
            Chat chat = new Chat();
            try {
                chatRepository.save(chat);
                meetingResponse.setChatID(chat.getId());
            } catch (Exception e) {
                e.printStackTrace();
            }
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


    public ArrayList<Meeting> findByNameLike(String name) {
        return meetingRepository.findByNameLike(name);
    }

    public ArrayList<Meeting> findByName(String name) {
        return meetingRepository.findByName(name);
    }

    ArrayList<Meeting> findByStartAfter(Date start) {
        return meetingRepository.findByStartAfter(start);
    }

    ArrayList<Meeting> findByEndBefore(Date end) {
        return meetingRepository.findByEndBefore(end);
    }

    public ArrayList<Meeting> searchFilter(FilterRequest filter) {
        ArrayList<Meeting> meetings = new ArrayList<>();
        TemporalAccessor ta = DateTimeFormatter.ISO_INSTANT.parse(filter.getStartDate());
        Instant i = Instant.from(ta);
        Date startDate = Date.from(i);
        meetings = findByStartAfter(startDate);

        if (filter.getName() != null && !filter.getName().isEmpty()) {
            meetings = searchFilterName(meetings, filter.getName());
        }
        if (filter.getEndDate() != null) {
            TemporalAccessor taend = DateTimeFormatter.ISO_INSTANT.parse(filter.getStartDate());
            Instant iend = Instant.from(taend);
            Date endDate = Date.from(iend);
            meetings = findByStartAfter(endDate);
            meetings = searchFilterDateEnd(meetings, endDate);
        }
        if (filter.getTags() != null && filter.getTags().size() > 0) {
            meetings = searchFilterTags(meetings, filter.getTags());
        }
        if (filter.getLocation()!= null) {
            meetings = searchFilterLocations(meetings, filter.getLocation());
        }

        return meetings;

    }


    public ArrayList<Meeting> searchFilterName(ArrayList<Meeting> meetings, String name) {
        return (ArrayList<Meeting>) meetings.stream()
                .filter(meeting ->
                        meeting.getName().contains(name));
    }

    public ArrayList<Meeting> searchFilterDateEnd(ArrayList<Meeting> meetings, Date end) {
        DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        String string1 = "2001-07-04T12:08:56.235-0700";
        Date result1 = null;
        try {
             result1= df1.parse(string1);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return meetings ;/*(ArrayList<Meeting>) meetings.stream()
                .filter(meeting ->
                        result1.parse(meeting.getEnd()) <= end.getTime());*/
    }

    public ArrayList<Meeting> searchFilterTags(ArrayList<Meeting> meetings, ArrayList<Tag> tags){
        return (ArrayList<Meeting>) meetings.stream()
                .filter(meeting ->
                        CollectionUtils.containsAny(meeting.getTags(), tags));
    }

    public ArrayList<Meeting> searchFilterLocations(ArrayList<Meeting> meetings, Location location){
        return (ArrayList<Meeting>) meetings.stream()
                .filter(meeting ->
                        meeting.getLocationID() == location.getId());
    }
}


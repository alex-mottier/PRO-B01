package ch.amphytrion.project.services;

import ch.amphytrion.project.dto.FilterRequest;
import ch.amphytrion.project.dto.MeetingResponse;
import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Student;
import ch.amphytrion.project.entities.databaseentities.Tag;
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
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MeetingService implements IGenericService<Meeting> {

    private MeetingRepository meetingRepository;
    private LocationRepository locationRepository;
    private ChatRepository chatRepository;

    @Autowired
    public MeetingService(MeetingRepository meetingRepository, LocationRepository locationRepository, ChatRepository chatRepository) {
        this.meetingRepository = meetingRepository;
        this.chatRepository = chatRepository;
        this.locationRepository = locationRepository;
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

    public MeetingResponse addMemberToMeeting(String meetingID) {
        try {

            Student student = new Student(null, null, null); // TODO Use current user
            Meeting meeting = findById(meetingID);
            MeetingResponse meetingResponse = new MeetingResponse(meeting);
            meetingResponse.membersId.add(student.getId());
            if (student.getMeetingsParticipations() != null) {
                student.getMeetingsParticipations().add(meeting);
            } else {
                ArrayList<Meeting> meetings = new ArrayList<>();
                meetings.add(meeting);
                student.setMeetingsParticipations(meetings);
            }
            return meetingResponse;
        }
        catch (Exception e) {
            return null;
        }
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
        TemporalAccessor ta = DateTimeFormatter.ISO_INSTANT.parse(filter.startDate);
        Instant i = Instant.from(ta);
        Date startDate = Date.from(i);
        meetings = findByStartAfter(startDate);

        if (filter.name != null && !filter.name.isEmpty()) {
            meetings = searchFilterName(meetings, filter.name);
        }
        if (filter.startDate == null) {
            filter.startDate = "";
        }
        else {
            TemporalAccessor taend = DateTimeFormatter.ISO_INSTANT.parse(filter.startDate);
            Instant iend = Instant.from(taend);
            Date endDate = Date.from(iend);
            meetings = findByStartAfter(endDate);
            meetings = searchFilterDateEnd(meetings, endDate);
        }
        if (filter.endDate == null) {
            filter.endDate = "";
        }
        if (filter.tags != null && filter.tags.size() > 0) {
            meetings = searchFilterTags(meetings, filter.tags);
        }
        if (filter.location != null) {
            meetings = searchFilterLocations(meetings, filter.location);
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


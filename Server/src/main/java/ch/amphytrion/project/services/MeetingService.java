package ch.amphytrion.project.services;

import ch.amphytrion.project.dto.FilterRequest;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.repositories.LocationRepository;
import ch.amphytrion.project.repositories.MeetingRepository;
import ch.amphytrion.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
            if (studentProfil != null) {
                meeting.getMembersID().add(member.getId());
                meeting.setNbPeople(meeting.getNbPeople() + 1);
                studentProfil.getMeetingsParticipationsID().add(meeting.getId());
                save(meeting);
                userRepository.save(member);
                return meeting;
            } else {
                return null;
            }
        } catch (Exception e) {
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
        return meetingRepository.findByStartDateAfter(start);
    }

    ArrayList<Meeting> findByEndBefore(Date end) {
        return meetingRepository.findByEndDateBefore(end);
    }

    public ArrayList<Meeting> searchFilter(FilterRequest filter) {
//        ArrayList<Meeting> meetings = new ArrayList<>();
//        TemporalAccessor ta = null;
//        Instant i = Instant.from(ta);
//        Date startDate = Date.from(i);
//        meetings = findByStartAfter(startDate);

//        if (filter.name != null && !filter.name.isEmpty()) {
//            meetings = searchFilterName(meetings, filter.name);
//        }
//        if (filter.startDate == null) {
//            filter.startDate = "";
//        } else {
//            ta = DateTimeFormatter.ISO_INSTANT.parse(filter.startDate);
//        }
//        TemporalAccessor taend = null;
//        Instant iend = Instant.from(taend);
//        Date endDate = Date.from(iend);
//        meetings = findByStartAfter(endDate);
//        meetings = searchFilterDateEnd(meetings, endDate);
//        if (filter.endDate == null) {
//            filter.endDate = "";
//        } else {
//            taend = DateTimeFormatter.ISO_INSTANT.parse(filter.startDate);
//        }
//        if (filter.tags != null && filter.tags.size() > 0) {
//            meetings = searchFilterTags(meetings, filter.tags);
//        }
//        if (filter.location != null) {
//            meetings = searchFilterLocations(meetings, filter.location);
//        }

        return meetingRepository.findByNameLike(filter.name);

    }

    public ArrayList<Meeting> allFilters(ArrayList<Meeting> meetings, FilterRequest filter) {
        System.out.println("");
        return (ArrayList<Meeting>) meetings.stream()
                .filter(meeting ->
                        meeting.getName().contains(filter.name))
                .filter(meeting ->
                        CollectionUtils.containsAny(meeting.getTags(), filter.tags))
                .filter(meeting ->
                        meeting.getLocationID() == filter.location.getId());
        //stream avec le meeting et son score, on le passe dans la map et on met a jour le score
        //enlever du stream si besoin
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


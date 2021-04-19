package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Tag;
import ch.amphytrion.project.entities.notdatabaseentities.FilterRequest;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.repositories.LocationRepository;
import ch.amphytrion.project.repositories.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.time.ZoneId;
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
        meetings = findByStartAfter(filter.getStartDate());

        if (filter.getName() != null && !filter.getName().isEmpty()) {
            meetings = searchFilterName(meetings, filter.getName());
        }
        if (filter.getEndDate() != null) {
            meetings = searchFilterDateEnd(meetings, LocalDateTime.ofInstant(filter.getEndDate().toInstant(), ZoneId.systemDefault()));
        }
        if (filter.getTags() != null && filter.getTags().size() > 0) {
            meetings = searchFilterTags(meetings, filter.getTags());
        }
        if (filter.getLocations()!= null && filter.getLocations().size() > 0) {
            meetings = searchFilterLocations(meetings, filter.getLocations());
        }

        return meetings;

    }

    public ArrayList<Meeting> searchFilterName(ArrayList<Meeting> meetings, String name) {
        return (ArrayList<Meeting>) meetings.stream()
                .filter(meeting ->
                        meeting.getName().contains(name));
    }

    public ArrayList<Meeting> searchFilterDateEnd(ArrayList<Meeting> meetings, LocalDateTime end) {
        return (ArrayList<Meeting>) meetings.stream()
                .filter(meeting ->
                        meeting.getEnd().isBefore(end));
    }

    public ArrayList<Meeting> searchFilterTags(ArrayList<Meeting> meetings, ArrayList<Tag> tags){
        return (ArrayList<Meeting>) meetings.stream().filter(meeting -> CollectionUtils.containsAny(meeting.getTags(), tags));
    }

    public ArrayList<Meeting> searchFilterLocations(ArrayList<Meeting> meetings, ArrayList<Location> locations){
       /* ArrayList<Location> locationsFilter = new ArrayList<>();
        for(Meeting m : meetings) {
            locationsFilter.add(locationRepository.findById(m.getLocationID()));
        }*/
        ArrayList<String> locationsID = new ArrayList<>();
        locations.forEach(location -> locationsID.add(location.getId()));
        ArrayList<String> meetingsID = new ArrayList();
        meetings.forEach(meeting -> meetingsID.add(meeting.getLocationID()));
        List<String> intersectionID = locationsID.stream()
                .filter(meetingsID::contains)
                .collect(Collectors.toList());
        ArrayList<Optional<Meeting>> meetingsArrayList = new ArrayList<>();
        for(String id : intersectionID) {
            meetingsArrayList.add(meetingRepository.findById(id));
        }

        return ((ArrayList<Meeting>) meetings.stream().filter(meeting -> CollectionUtils.containsAny(meeting.getLocationID()))
    }
}


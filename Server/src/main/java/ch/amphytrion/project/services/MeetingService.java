package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Tag;
import ch.amphytrion.project.entities.notdatabaseentities.FilterRequest;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.repositories.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MeetingService implements IGenericService<Meeting> {

    private MeetingRepository meetingRepository;

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
        if (meetingResponse.getId() != null && !meetingResponse.getId().isEmpty()){
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


    public ArrayList<Meeting> findByNameLike(String name){
        return meetingRepository.findByNameLike(name);
    }

    public ArrayList<Meeting> findByName(String name){ return meetingRepository.findByName(name);}

    public ArrayList<Meeting> searchFilter(FilterRequest filter) {
        ArrayList<Meeting> result = new ArrayList<>();
        ArrayList<Meeting> names = findByNameLike(filter.getName());
        result.addAll(names);
        return result;
        //return this.findByFilterExploded(filter.getName(), filter.getStartDate(),filter.getEndDate(),filter.getTags(),filter.getLocations());
    }

    /*public List<Meeting> findByFilterExploded(String name, Date startDate, Date endDate, ArrayList<Tag> tags, ArrayList<Location> locations){
        return meetingRepository.finByFilterExploded(name, startDate, endDate, tags, locations);
    }*/
}

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

import java.time.LocalDateTime;
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

    ArrayList<Meeting> findByStartAfter(Date start){
        return  meetingRepository.findByStartAfter(start);
    }
    ArrayList<Meeting> findByEndBefore(Date end){
        return meetingRepository.findByEndBefore(end);
    }
    public ArrayList<Meeting> searchFilter(FilterRequest filter) {
        ArrayList<Meeting> result = new ArrayList<>();
        ArrayList<Meeting> names = null;
        ArrayList<Meeting> startDates = null;
        ArrayList<Meeting> endDates = null;
        int parameters = 0;
        if (!(filter.getName() == null) && !filter.getName().isEmpty()) {
            names = findByNameLike(filter.getName());
            parameters += names.size()>0?1:0;
        }
        if (!(filter.getStartDate() == null)){
            startDates = findByStartAfter(filter.getStartDate());
            parameters += startDates.size()>0?1:0;
        }
        if (!(filter.getEndDate() == null)){
            endDates = findByEndBefore(filter.getEndDate());
            parameters += endDates.size()>0?1:0;
        }

        result.addAll(names);
        result.addAll(startDates);
        result.addAll(endDates);

        for (int i = 0; (i < result.size()-1) && (parameters > 1); i++){
            // pour garder que les doublons => ceux qui proviennent du résultat de plusieurs recherches
            if (!result.get(i).equals(result.get(i+1))){
                result.remove(i);
            }
        }
        return result;

    }
}


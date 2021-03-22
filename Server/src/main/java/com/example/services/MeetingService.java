package com.example.services;

import com.example.neo4jEntities.Meeting;
import com.example.repositories.MeetingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService implements IGenericService<Meeting> {

    private MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    @Override
    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    @Override
    public Meeting save(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    @Override
    public Meeting findById(long id) {
        try {
            return meetingRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(Meeting meeting) {
        meetingRepository.delete(meeting);
    }

    @Override
    public void deleteById(long id) {
        meetingRepository.deleteById(id);
    }

    @Override
    public long count() {
        return meetingRepository.count();
    }

}

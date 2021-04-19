package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Tag;
import ch.amphytrion.project.entities.notdatabaseentities.FilterRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Filter;

@Repository
public interface MeetingRepository extends MongoRepository<Meeting, String> {
    ArrayList<Meeting> findByName(String name);

    //@Query(value="{ 'name' : ?0, 'start' : ?1, 'end' : ?2, 'tags' : ?3, 'locationID' : ?4 }", fields="{ 'firstname' : 1, 'lastname' : 1}")
    ArrayList<Meeting> findByNameLike(String name);
    ArrayList<Meeting> findByStartAfter(Date start);
    ArrayList<Meeting> findByEndBefore(Date end);
    ArrayList<Meeting> findByTagsEquals(ArrayList<Tag> tags);
    //ArrayList<Meeting> findByLocationID();
    //ArrayList<Meeting> searchFilter(FilterRequest filter);
}


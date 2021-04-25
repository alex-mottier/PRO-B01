package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;
import java.util.Date;

@Repository
public interface MeetingRepository extends MongoRepository<Meeting, String> {
    ArrayList<Meeting> findByName(String name);

    //@Query(value="{ 'name' : ?0, 'start' : ?1, 'end' : ?2, 'tags' : ?3, 'locationID' : ?4 }", fields="{ 'firstname' : 1, 'lastname' : 1}")
    ArrayList<Meeting> findByNameLike(String name);
    ArrayList<Meeting> findByStartDateAfter(Date start);
    ArrayList<Meeting> findByEndDateBefore(Date end);
    ArrayList<Meeting> findByOwnerID(String ownerID);
    ArrayList<Meeting> findByTagsEquals(ArrayList<Tag> tags);
    //ArrayList<Meeting> findByLocationID();
    //ArrayList<Meeting> searchFilter(FilterRequest filter);
}


package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Tag;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Repository
public interface MeetingRepository extends MongoRepository<Meeting, String> {
    ArrayList<Meeting> findByName(String name);
    ArrayList<Meeting> findByOwnerID(String ownerID);
    ArrayList<Meeting> findByTagsEquals(ArrayList<Tag> tags);

    ArrayList<Meeting> findByLocationID(String id);
    //ArrayList<Meeting> findByLocationID();
    //ArrayList<Meeting> searchFilter(FilterRequest filter);
}


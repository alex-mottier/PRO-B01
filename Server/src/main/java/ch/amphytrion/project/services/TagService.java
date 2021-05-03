package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.Tag;
import ch.amphytrion.project.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService implements IGenericService<Tag> {

    private TagRepository tagRepository;

    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Tag> findAll() {
        return tagRepository.findAll();
    }

    @Override
    public Tag save(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public Tag findById(String id) {
        try {
            return tagRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(Tag tag) {
        tagRepository.delete(tag);
    }

    @Override
    public void deleteById(String id) {
        tagRepository.deleteById(id);
    }

    @Override
    public long count() {
        return tagRepository.count();
    }

}

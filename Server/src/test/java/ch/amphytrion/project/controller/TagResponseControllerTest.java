package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.TagRepository;
import ch.amphytrion.project.services.TagService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TagControllerTest {

    TagRepository tagRepository;
    TagService tagService = new TagService(tagRepository);
    TagController tagController = new TagController(tagService);

    @Test
    void name() {
        assertEquals(TagController.class.getCanonicalName(),
                tagController.controllerName());
    }
}

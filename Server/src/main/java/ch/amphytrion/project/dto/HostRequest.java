package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Address;
import ch.amphytrion.project.entities.databaseentities.Tag;

import java.util.ArrayList;

public class HostRequest {
    private String id;
    private String name;
    private Address address;
    private String description;
    private ArrayList<Tag> tags;
}

package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Address;
import ch.amphytrion.project.entities.databaseentities.Tag;

import java.util.ArrayList;

public class HostRequest implements InterfaceDTO {
    public String id;
    public String name;
    public Address address;
    public String description;
    public ArrayList<Tag> tags;
}

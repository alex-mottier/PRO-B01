package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Address;
import ch.amphytrion.project.entities.databaseentities.HostProfil;
import ch.amphytrion.project.entities.databaseentities.Tag;

import java.util.ArrayList;

public class HostRequest implements InterfaceDTO {
    public String id;
    public String name;
    public Address address;
    public String description;
    public ArrayList<Tag> tags;

    public HostRequest(HostProfil hostProfil) {
        this.id = hostProfil.getId();
        this.name = hostProfil.getUsername();
        this.address = hostProfil.getAddress();
        this.description = hostProfil.getDescription();
        this.tags = hostProfil.getTags();

    }
}

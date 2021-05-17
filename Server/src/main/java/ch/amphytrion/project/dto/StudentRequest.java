package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class StudentRequest implements InterfaceDTO {
    public String tokenID;
    public String username;
}

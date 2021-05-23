package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@NoArgsConstructor
@AllArgsConstructor
public class StudentRequest implements InterfaceDTO {
    public String tokenID;
    public String username;
}

package ch.amphytrion.project.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse implements InterfaceDTO {
    public String message;
}

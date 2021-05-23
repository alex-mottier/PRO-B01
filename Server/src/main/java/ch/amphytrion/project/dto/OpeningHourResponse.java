package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.OpeningHour;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@AllArgsConstructor
@NoArgsConstructor
public class OpeningHourResponse implements InterfaceDTO {
    public Integer day;
    // hh:mm
    public String startTime;
    public String endTime;

    public OpeningHourResponse(OpeningHour openingHour){
        this.day = openingHour.getDay();
        this.startTime = openingHour.getStartTime().toString();
        this.endTime = openingHour.getEndTime().toString();
    }

}

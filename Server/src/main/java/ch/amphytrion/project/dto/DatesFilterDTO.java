package ch.amphytrion.project.dto;

import ch.amphytrion.project.controller.CustomException;
import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;
import org.joda.time.format.ISODateTimeFormat;
import lombok.Data;

/**
 * Filter composed of two dates. Used in meetings search
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DatesFilterDTO implements InterfaceDTO {
    public String startDate;
    public String endDate;

    /**
     * DatesFilterDTO constructor
     * @param meeting the meeting to filter (or not)
     */
    public DatesFilterDTO (Meeting meeting){
        this.startDate = meeting.getStartDate();
        this.endDate = meeting.getEndDate();
    }

    /**
     * Check if two dates are in (or part of) two other dates
     * @param datesFilter Object made of two dates, REST convenient
     * @throws CustomException
     * @return boolean true if between two dates given in parameters
     */
    public boolean isBetween(DatesFilterDTO datesFilter) {
        // CHECK IF DATE NOT NULL OR EMPTY

        /*
        4 cases :
        - filtre a 2 dates => vérifications
        - filtre a 1 date de début mais pas date de fin => tout ce qui fini après date début filtre
        - filtre a 1 date fin mais pas de date début =>  tout ce qui commence avant date de fin filtre
        - filtre pas de date => TOUT
         */
        boolean isStartInBetween = true;
        boolean isEndInBetween = true;
        if( !datesFilter.startDate.equals("") || !datesFilter.endDate.equals("")) {
            if (datesFilter.startDate.equals("")) {
                isEndInBetween = false;
                isStartInBetween = compareStringDatesSmaller(this.getStartDate(), datesFilter.getEndDate());
            }else if (datesFilter.endDate.equals("")) {
                isStartInBetween = false;
                isEndInBetween = compareStringDatesBigger(this.getEndDate(), datesFilter.getStartDate());
            } else {
                /* les deux dates sont remplies : */
                isStartInBetween = compareStringDatesSmaller(this.getStartDate(), datesFilter.getEndDate())
                                    && compareStringDatesBigger(this.getStartDate(), datesFilter.getStartDate());
                /* on vérifie que la date de début de l'objet est bien comprise entre la date de début et date de fin du filter */
                isEndInBetween = compareStringDatesBigger(this.getEndDate(), datesFilter.getStartDate())
                                    && compareStringDatesSmaller(this.getEndDate(), datesFilter.getEndDate());
                /* on vérifie que la date de fin de l'objet est bien comprise entre la date de début et date de fin du filter */
            }
        }
        return isStartInBetween || isEndInBetween;
    }

    /**
     * Parse convert two Strings to dates and check if one is after the another
     * @param sDate1 an iso date in String
     * @param sDate2 an iso date in String
     * @return boolean true if sDate1 > sDate2
     */
    public boolean compareStringDatesBigger(String sDate1, String sDate2) {
        DateTime dateTime1 = ISODateTimeFormat.dateTime().parseDateTime(sDate1);
        DateTime dateTime2 = ISODateTimeFormat.dateTime().parseDateTime(sDate2);
        return dateTime1.isAfter(dateTime2);
    }

    /**
     * Parse convert two Strings to dates and check if one is before the another
     * @param sDate1 an iso date in String
     * @param sDate2 an iso date in String
     * @return boolean true if sDate1 < sDate2
     */
    public boolean compareStringDatesSmaller(String sDate1, String sDate2) {
        DateTime dateTime1 = ISODateTimeFormat.dateTime().parseDateTime(sDate1);
        DateTime dateTime2 = ISODateTimeFormat.dateTime().parseDateTime(sDate2);
        return dateTime1.isBefore(dateTime2);
    }
}

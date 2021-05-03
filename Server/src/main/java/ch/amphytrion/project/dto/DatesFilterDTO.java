package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import lombok.AllArgsConstructor;
import org.joda.time.DateTime;
import org.joda.time.format.ISODateTimeFormat;
import lombok.Data;

@AllArgsConstructor
@Data
public class DatesFilterDTO implements InterfaceDTO {
    public String startDate;
    public String endDate;


    public DatesFilterDTO (Meeting meeting){
        this.startDate = meeting.getStartDate();
        this.endDate = meeting.getEndDate();
    }

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

    public boolean compareStringDatesBigger(String sDate1, String sDate2) {
        DateTime dateTime1 = ISODateTimeFormat.dateTime().parseDateTime(sDate1);
        DateTime dateTime2 = ISODateTimeFormat.dateTime().parseDateTime(sDate2);
        return dateTime1.isAfter(dateTime2);
    }

    public boolean compareStringDatesSmaller(String sDate1, String sDate2) {
        DateTime dateTime1 = ISODateTimeFormat.dateTime().parseDateTime(sDate1);
        DateTime dateTime2 = ISODateTimeFormat.dateTime().parseDateTime(sDate2);
        return dateTime1.isBefore(dateTime2);
    }
}
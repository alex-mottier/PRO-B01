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
        boolean isCorrect = true;
        // CHECK IF DATE NOT NULL OR EMPTY
        boolean isStartInBetween = compareStringDatesBigger(this.getStartDate(), datesFilter.startDate) &&
                compareStringDatesSmaller(this.getStartDate(), datesFilter.endDate);
        boolean isEndInBetween = compareStringDatesBigger(this.getEndDate(), datesFilter.startDate) &&
                compareStringDatesSmaller(this.getEndDate(), datesFilter.endDate);
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
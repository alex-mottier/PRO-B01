package ch.amphytrion.project.dto;

/**
 * A class used to filter locations between two dates and/or having a specified meetingID
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
public class LocationFilterDTO implements InterfaceDTO{
    public String startDate;
    public String endDate;
    public String meetingID;
}

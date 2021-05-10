package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Address;
import ch.amphytrion.project.entities.databaseentities.CovidData;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class CovidDataResponse implements InterfaceDTO {
    public String id;
    public Boolean isOpen;
    public Boolean masksRequired;
    public Boolean disinfectionRequired;
    public String recommendedDistancing;
    public String comments;

    public CovidDataResponse(CovidData covidData) {
        this.id = covidData.getId();
        this.isOpen = covidData.getIsOpen();
        this.masksRequired = covidData.getMasksRequired();
        this.disinfectionRequired = covidData.getDisinfectionRequired();
        this.recommendedDistancing = covidData.getRecommendedDistancing();
        this.comments = covidData.getComments();
    }
}

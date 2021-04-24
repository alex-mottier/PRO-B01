package ch.amphytrion.project.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class OpeningHourResponse implements InterfaceDTO {
    public String id;
    public Integer day;
    // hh:mm
    public String startTime;
    public String endTime;
}

package ch.amphytrion.project.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class SuccessResponse implements InterfaceDTO {
    public String name;
    public String message;
}

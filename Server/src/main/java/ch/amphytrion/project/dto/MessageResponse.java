package ch.amphytrion.project.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse implements InterfaceDTO {
    public String message;
    public String username;
    // Format ISO 8601
    public String date;
}

package ch.amphytrion.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticateRequest implements InterfaceDTO{
    public String googleToken;
}

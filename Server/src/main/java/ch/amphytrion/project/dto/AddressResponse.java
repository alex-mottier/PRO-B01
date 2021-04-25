package ch.amphytrion.project.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class AddressResponse implements InterfaceDTO {
    public String id;
    public String street;
    public String streetNb;
    public String cityName;
    public String npa;

}

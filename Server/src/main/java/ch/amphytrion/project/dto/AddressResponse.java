package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Address;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * Address RESTful response class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@AllArgsConstructor
@NoArgsConstructor
public class AddressResponse implements InterfaceDTO {
    public String id;
    public String street;
    public String streetNb;
    public String cityName;
    public String npa;

    public AddressResponse(Address address) {
        this.id = address.getId();
        this.street = address.getStreet();
        this.streetNb = address.getStreetNb();
        this.cityName = address.getCity().getName();
        this.npa = address.getCity().getZip();
    }
}

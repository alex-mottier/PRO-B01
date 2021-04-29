package ch.amphytrion.project.data;

import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.services.UserService;

import java.util.Collections;

public class DataCreator {

    public static void createHost(UserService userService){
                User host = new User("heig-google-id", "HEIG");
        City city = new City("Yverdon-les-Bains", "1401");
        Address address = new Address("Route de Cheseaux", "1", city);
        HostProfil hp = new HostProfil(address, "Ecole supérieure mais pas trop", Collections.singletonList(new Tag("HEIG")) );
        host.setHostProfil(hp);
        userService.save(host);
    }
}

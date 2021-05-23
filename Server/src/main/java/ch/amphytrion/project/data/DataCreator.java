package ch.amphytrion.project.data;

import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.services.UserService;

import java.util.Collections;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
public class DataCreator {

    public static void createHost(UserService userService){
                User host = new User("heig-google-id", "HEIG");
        City city = new City("Yverdon-les-Bains", "1401");
        Address address = new Address("Route de Cheseaux", "1", city);
        CovidData covidData = new CovidData(true, true, false, "", "");
        HostProfil hp = new HostProfil(address, "Ecole supérieure mais pas trop", Collections.singletonList(new Tag("HEIG")), covidData);
        host.setHostProfil(hp);
        userService.save(host);
    }
}

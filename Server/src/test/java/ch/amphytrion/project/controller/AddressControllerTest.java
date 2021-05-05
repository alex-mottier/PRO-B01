package ch.amphytrion.project.controller;

import static ch.amphytrion.project.authentication.SecurityConstants.HEADER_STRING;
import static ch.amphytrion.project.authentication.utils.JwtUtils.makeHeaderToken;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.mockito.Mockito.when;
import static org.hamcrest.Matchers.containsString;

import ch.amphytrion.project.dto.AddressResponse;
import ch.amphytrion.project.entities.databaseentities.Address;
import ch.amphytrion.project.entities.databaseentities.City;
import ch.amphytrion.project.services.AddressService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class AddressControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AddressService addressService;

    private Address address;
    private AddressResponse addressResponse;
    private String token;


    @BeforeAll
    static void createAddress(){

    }

    @Test
    void testSaveAddress() throws Exception {
        City city = new City("Yverdon-les-Bains", "1401");
        address = new Address("Route de Cheseaux", "1", city);
        addressResponse = new AddressResponse(address);
        token = makeHeaderToken("amottier");

        Gson gson = new Gson();
        String content = gson.toJson(address);
        mockMvc.perform(
                post("/address")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HEADER_STRING,"Bearer " + token)
                .content(content)
        )
            .andExpect(status().isOk())
            .andDo(print())
            .andExpect(content().string(containsString("")));
    }

    @Test
    void testFindByIdAddress(){
        when(addressService.findById(address.getId())).thenReturn(address);
    }

    @Test
    void testFindAllAddresses(){
        List<Address> addressList = new ArrayList<>();
        addressList.add(address);
        when(addressService.findAll()).thenReturn(addressList);
    }


}

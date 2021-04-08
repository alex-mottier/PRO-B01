package ch.amphytrion.project.neo4j;

import ch.amphytrion.project.entities.*;
import ch.amphytrion.project.services.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class Requests {

    void addUserToMeeting(User user, Meeting meeting){
        //trouver l'id du user
        //trouver l'id du meeting. le créer si nécessaire



    }
}

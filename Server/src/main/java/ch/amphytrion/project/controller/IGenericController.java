package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.HostProfil;
import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;

public interface IGenericController<T> {
    default User getCurrentUser(){
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    default void checkUserIsStudent() throws CustomException {
        User currentUser = getCurrentUser();
        if(currentUser.getStudentProfil() == null){
            throw new CustomException("Ce n'est pas un compte étudiant", HttpStatus.UNAUTHORIZED, null);
        }
    }

    default void checkHostIsStudent() throws CustomException {
        User currentUser = getCurrentUser();
        if(currentUser.getHostProfil() == null){
            throw new CustomException("Ce n'est pas un compte hébergeur", HttpStatus.UNAUTHORIZED, null);
        }
    }
}

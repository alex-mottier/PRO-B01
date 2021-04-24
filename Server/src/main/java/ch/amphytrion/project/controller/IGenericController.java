package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.User;
import org.springframework.security.core.context.SecurityContextHolder;

public interface IGenericController<T> {
    public default User getCurrentUser(){
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}

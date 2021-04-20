package ch.amphytrion.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface IGenericController<T> {
//    ResponseEntity<List<T>> getAll();
//    ResponseEntity<T> save(@RequestBody T entity);
    ResponseEntity<T> getById(@PathVariable String id);
}

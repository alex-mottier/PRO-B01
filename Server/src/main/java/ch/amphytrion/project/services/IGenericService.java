package ch.amphytrion.project.services;

import java.util.List;

public interface IGenericService<T> {
    List<T> findAll();
    T save(T entity);
    T findById(String id);
    void delete(T entity);
    void deleteById(String id);
    long count();
}

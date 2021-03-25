package ch.amphytrion.project.services;

import java.util.List;

public interface IGenericService<T> {
    List<T> findAll();
    T save(T entity);
    T findById(long id);
    void delete(T entity);
    void deleteById(long id);
    long count();
}

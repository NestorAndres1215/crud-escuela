package com.crud.escuela.service;

import com.crud.escuela.dto.AlumnoRequest;
import com.crud.escuela.entity.Alumno;

import java.util.List;
import java.util.Optional;

public interface AlumnoService {

    List<Alumno> findAll();

    Optional<Alumno> findById(Long id);

    List<Alumno> findByNombre(String nombre);

    List<Alumno> findByApellido(String apellido);

    List<Alumno> findByEmail(String email);

    List<Alumno> findByTelefono(String telefono);

    List<Alumno> findByNombreAndApellido(String nombre, String apellido);

    Alumno save(AlumnoRequest alumno);

    Alumno update(Long id , AlumnoRequest alumno);

    void delete(Long id);

}

package com.crud.escuela.service;

import com.crud.escuela.dto.DocenteRequest;
import com.crud.escuela.entity.Docente;
import java.util.List;
import java.util.Optional;

public interface DocenteService {

    List<Docente> findAll();

    Optional<Docente> findById(Long id);

    List<Docente> findByNombre(String nombre);

    List<Docente> findByApellido(String apellido);

    List<Docente> findByCorreo(String correo);

    List<Docente> findByTelefono(String telefono);

    List<Docente> findByNombreAndApellido(String nombre, String apellido);

    Docente save(DocenteRequest docenteRequest);

    Docente update(Long id, DocenteRequest alumno);

    void delete(Long id);
}

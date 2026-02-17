package com.crud.escuela.repository;

import com.crud.escuela.entity.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;


public interface AlumnoRepository extends JpaRepository<Alumno, Long> {


    Optional<Alumno> findById(Long aLong);

    List<Alumno> findByNombre(String nombre);

    List<Alumno> findByApellido(String apellido);

    List<Alumno> findByEmail(String email);

    List<Alumno> findByTelefono(String telefono);

    List<Alumno> findByNombreAndApellido(String nombre, String apellido);
}

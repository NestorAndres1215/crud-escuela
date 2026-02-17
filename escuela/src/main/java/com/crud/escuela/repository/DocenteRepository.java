package com.crud.escuela.repository;

import com.crud.escuela.entity.Docente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocenteRepository extends JpaRepository<Docente,Long> {

    List<Docente> findByNombre(String nombre);

    List<Docente> findByApellido(String apellido);

    List<Docente> findByCorreo(String correo);

    List<Docente> findByTelefono(String telefono);

    List<Docente> findByNombreAndApellido(String nombre, String apellido);

}

package com.crud.escuela.controller;

import com.crud.escuela.dto.AlumnoRequest;
import com.crud.escuela.entity.Alumno;
import com.crud.escuela.exception.BadRequestException;
import com.crud.escuela.service.AlumnoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Collections;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class AlumnoController {

    private final AlumnoService alumnoService;


    @QueryMapping
    public List<Alumno> obtenerAlumnos() {
        return alumnoService.findAll();
    }

    @QueryMapping
    public Alumno obtenerAlumnoPorId(@Argument Long id) {
        return alumnoService.findById(id)
                .orElseThrow(() -> new BadRequestException("Alumno no encontrado con id: " + id));
    }


    @QueryMapping
    public List<Alumno> buscarAlumnosPorNombre(@Argument String nombre) {
        List<Alumno> lista = alumnoService.findByNombre(nombre);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Alumno> buscarAlumnosPorApellido(@Argument String apellido) {
        List<Alumno> lista = alumnoService.findByApellido(apellido);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Alumno> buscarAlumnosPorEmail(@Argument String email) {
        List<Alumno> lista = alumnoService.findByEmail(email);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Alumno> buscarAlumnosPorTelefono(@Argument String telefono) {
        List<Alumno> lista = alumnoService.findByTelefono(telefono);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Alumno> buscarAlumnosPorNombreYApellido(@Argument String nombre, @Argument String apellido) {
        List<Alumno> lista = alumnoService.findByNombreAndApellido(nombre, apellido);
        return lista != null ? lista : Collections.emptyList();
    }


    @MutationMapping
    public Alumno crearAlumno(@Argument("alumno") @Valid AlumnoRequest request) {
        return alumnoService.save(request);
    }


    @MutationMapping
    public Alumno actualizarAlumno(
            @Argument Long id,
            @Argument("alumno") @Valid AlumnoRequest request) {
        return alumnoService.update(id, request);
    }

    @MutationMapping
    public String eliminarAlumno(@Argument Long id) {
        alumnoService.delete(id);
        return "Alumno con ID " + id + " eliminado correctamente";
    }
}

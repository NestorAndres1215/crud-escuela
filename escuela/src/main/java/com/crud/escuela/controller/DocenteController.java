package com.crud.escuela.controller;

import com.crud.escuela.dto.DocenteRequest;
import com.crud.escuela.entity.Docente;
import com.crud.escuela.exception.BadRequestException;
import com.crud.escuela.service.DocenteService;
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
public class DocenteController {

    private final DocenteService docenteService;

    @QueryMapping
    public List<Docente> obtenerDocentes() {
        return docenteService.findAll();
    }

    @QueryMapping
    public Docente obtenerDocentePorId(@Argument Long id) {
        return docenteService.findById(id)
                .orElseThrow(() -> new BadRequestException("Docente no encontrado con id: " + id));
    }

    @QueryMapping
    public List<Docente> buscarDocentesPorNombre(@Argument String nombre) {
        List<Docente> lista = docenteService.findByNombre(nombre);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Docente> buscarDocentesPorApellido(@Argument String apellido) {
        List<Docente> lista = docenteService.findByApellido(apellido);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Docente> buscarDocentesPorCorreo(@Argument String correo) {
        List<Docente> lista = docenteService.findByCorreo(correo);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Docente> buscarDocentesPorTelefono(@Argument String telefono) {
        List<Docente> lista = docenteService.findByTelefono(telefono);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Docente> buscarDocentesPorNombreYApellido(@Argument String nombre, @Argument String apellido) {
        List<Docente> lista = docenteService.findByNombreAndApellido(nombre, apellido);
        return lista != null ? lista : Collections.emptyList();
    }

    @MutationMapping
    public Docente crearDocente(@Argument("docente") @Valid DocenteRequest request) {
        return docenteService.save(request);
    }

    @MutationMapping
    public Docente actualizarDocente(
            @Argument Long id,
            @Argument("docente") @Valid DocenteRequest request) {
        return docenteService.update(id, request);
    }

    @MutationMapping
    public String eliminarDocente(@Argument Long id) {
        docenteService.delete(id);
        return "Docente con ID " + id + " eliminado correctamente";
    }
}
package com.crud.escuela.controller;

import com.crud.escuela.dto.AlumnoRequest;
import com.crud.escuela.dto.AulaRequest;
import com.crud.escuela.entity.Alumno;
import com.crud.escuela.entity.Aula;
import com.crud.escuela.exception.BadRequestException;
import com.crud.escuela.service.AlumnoService;
import com.crud.escuela.service.AulaService;
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
public class AulaController {

    private final AulaService service;

    @QueryMapping
    public List<Aula> obtenerAula() {
        return service.findAll();
    }

    @QueryMapping
    public Aula obtenerAulaPorId(@Argument Long id) {
        return service.findById(id)
                .orElseThrow(() -> new BadRequestException("Aula no encontrado con id: " + id));
    }

    @QueryMapping
    public List<Aula> buscarAulaPorAula(@Argument String aula) {
        List<Aula> lista = service.findByAula(aula);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Aula> buscarAulaPorAforo(@Argument String aforo) {
        List<Aula> lista = service.findByAforo(aforo);
        return lista != null ? lista : Collections.emptyList();
    }

    @MutationMapping
    public Aula crearAula(@Argument("aula") @Valid AulaRequest request) {
        return service.save(request);
    }


    @MutationMapping
    public Aula actualizarAula(
            @Argument Long id,
            @Argument("aula") @Valid AulaRequest request) {
        return service.update(id, request);
    }

    @MutationMapping
    public String eliminarAula(@Argument Long id) {
        service.delete(id);
        return "Alumno con ID " + id + " eliminado correctamente";
    }

}

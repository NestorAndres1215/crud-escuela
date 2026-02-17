package com.crud.escuela.controller;


import com.crud.escuela.dto.CursoRequest;

import com.crud.escuela.entity.Curso;
import com.crud.escuela.exception.BadRequestException;
import com.crud.escuela.service.CursoService;
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
public class CursoController {

    private final CursoService service;

    @QueryMapping
    public List<Curso> obtenerCurso() {
        return service.findAll();
    }

    @QueryMapping
    public Curso obtenerCursoPorId(@Argument Long id) {
        return service.findById(id)
                .orElseThrow(() -> new BadRequestException("Curso no encontrado con id: " + id));
    }

    @QueryMapping
    public List<Curso> buscarCursoPorCurso(@Argument String curso) {
        List<Curso> lista = service.findByCurso(curso);
        return lista != null ? lista : Collections.emptyList();
    }

    @MutationMapping
    public Curso crearCurso(@Argument("curso") @Valid CursoRequest request) {
        return service.save(request);
    }


    @MutationMapping
    public Curso actualizarCurso(
            @Argument Long id,
            @Argument("curso") @Valid CursoRequest request) {
        return service.update(id, request);
    }

    @MutationMapping
    public String eliminarCurso(@Argument Long id) {
        service.delete(id);
        return "Curso con ID " + id + " eliminado correctamente";
    }


}

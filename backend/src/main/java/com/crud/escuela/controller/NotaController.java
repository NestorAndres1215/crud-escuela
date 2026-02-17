package com.crud.escuela.controller;

import com.crud.escuela.dto.NotaRequest;
import com.crud.escuela.entity.Alumno;
import com.crud.escuela.entity.Curso;
import com.crud.escuela.entity.Docente;
import com.crud.escuela.entity.Nota;
import com.crud.escuela.service.NotaService;
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
public class NotaController {

    private final NotaService notaService;

    // -------------------- CONSULTAS --------------------

    @QueryMapping
    public List<Nota> obtenerNotas() {
        return notaService.findAll();
    }

    @QueryMapping
    public Nota obtenerNotaPorId(@Argument Long id) {
        return notaService.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada con id: " + id));
    }

    @QueryMapping
    public List<Nota> buscarNotasPorAlumno(@Argument String nombreAlumno) {
        // Aquí se necesita buscar el Alumno por nombre
        Alumno alumno = new Alumno();
        alumno.setNombre(nombreAlumno);
        List<Nota> lista = notaService.findByAlumno(alumno);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Nota> buscarNotasPorCurso(@Argument String nombreCurso) {
        Curso curso = new Curso();
        curso.setCurso(nombreCurso);
        List<Nota> lista = notaService.findByCurso(curso);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Nota> buscarNotasPorDocente(@Argument String nombreDocente) {
        Docente docente = new Docente();
        docente.setNombre(nombreDocente);
        List<Nota> lista = notaService.findByDocente(docente);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Nota> buscarNotasPorAlumnoYCurso(@Argument String nombreAlumno, @Argument String nombreCurso) {
        Alumno alumno = new Alumno();
        alumno.setNombre(nombreAlumno);
        Curso curso = new Curso();
        curso.setCurso(nombreCurso);
        List<Nota> lista = notaService.findByAlumnoAndCurso(alumno, curso);
        return lista != null ? lista : Collections.emptyList();
    }

    @QueryMapping
    public List<Nota> buscarNotasMenorIgual(@Argument int notaMaxima) {
        List<Nota> lista = notaService.findByExamenFinalLessThanEqual(notaMaxima);
        return lista != null ? lista : Collections.emptyList();
    }

    // -------------------- MUTACIONES --------------------

    @MutationMapping
    public Nota crearNota(@Argument("nota") @Valid NotaRequest notaRequest) {
        return notaService.save(notaRequest);
    }

    @MutationMapping
    public Nota actualizarNota(@Argument Long id, @Argument("nota") @Valid NotaRequest notaRequest) {
        return notaService.update(id, notaRequest);
    }

    @MutationMapping
    public String eliminarNota(@Argument Long id) {
        notaService.delete(id);
        return "Nota con ID " + id + " eliminada correctamente";
    }
}

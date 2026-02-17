package com.crud.escuela.service.impl;

import com.crud.escuela.dto.NotaRequest;
import com.crud.escuela.entity.*;
import com.crud.escuela.exception.BadRequestException;
import com.crud.escuela.exception.ConflictException;
import com.crud.escuela.repository.*;
import com.crud.escuela.service.NotaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotaServiceImpl implements NotaService {

    private final NotaRepository notaRepository;
    private final DocenteRepository docenteRepository;
    private final CursoRepository cursoRepository;
    private final AulaRepository aulaRepository;
    private final AlumnoRepository alumnoRepository;

    @Override
    public List<Nota> findAll() {
        return notaRepository.findAll();
    }

    @Override
    public Optional<Nota> findById(Long id) {
        return notaRepository.findById(id);
    }

    @Override
    public List<Nota> findByAlumno(Alumno alumno) {
        return notaRepository.findByAlumno(alumno);
    }

    @Override
    public List<Nota> findByCurso(Curso curso) {
        return notaRepository.findByCurso(curso);
    }

    @Override
    public List<Nota> findByDocente(Docente docente) {
        return notaRepository.findByDocente(docente);
    }

    @Override
    public List<Nota> findByAlumnoAndCurso(Alumno alumno, Curso curso) {
        return notaRepository.findByAlumnoAndCurso(alumno, curso);
    }

    @Override
    public List<Nota> findByExamenFinalLessThanEqual(int notaMaxima) {
        return notaRepository.findByExamenFinalLessThanEqual(notaMaxima);
    }

    @Override
    public Nota save(NotaRequest notaRequest) {


        Alumno alumno = alumnoRepository.findByNombre(notaRequest.getAlumno())
                .stream().findFirst()
                .orElseThrow(() -> new BadRequestException("Alumno no encontrado"));


        Docente docente = docenteRepository.findByNombre(notaRequest.getDocente())
                .stream().findFirst()
                .orElseThrow(() -> new BadRequestException("Docente no encontrado"));


        Curso curso = cursoRepository.findByCurso(notaRequest.getCurso())
                .stream().findFirst()
                .orElseThrow(() -> new BadRequestException("Curso no encontrado"));

        Aula aula = aulaRepository.findByAula(notaRequest.getAula())
                .stream().findFirst()
                .orElseThrow(() -> new BadRequestException("Aula no encontrada"));


        int examenFinal = Math.round((notaRequest.getPracticas() + notaRequest.getParcial()) / 2.0f);

        Nota nota = Nota.builder()
                .alumno(alumno)
                .docente(docente)
                .curso(curso)
                .aula(aula)
                .practicas(notaRequest.getPracticas())
                .parcial(notaRequest.getParcial())
                .examenFinal(examenFinal)
                .build();

        return notaRepository.save(nota);
    }


    @Override
    public Nota update(Long id, NotaRequest notaRequest) {

        // Buscar la nota existente
        Nota notaExistente = notaRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Nota con ID " + id + " no encontrada"));


        Alumno alumno = alumnoRepository.findByNombre(notaRequest.getAlumno())
                .stream().findFirst()
                .orElseThrow(() -> new BadRequestException("Alumno no encontrado"));


        Docente docente = docenteRepository.findByNombre(notaRequest.getDocente())
                .stream().findFirst()
                .orElseThrow(() -> new BadRequestException("Docente no encontrado"));


        Curso curso = cursoRepository.findByCurso(notaRequest.getCurso())
                .stream().findFirst()
                .orElseThrow(() -> new BadRequestException("Curso no encontrado"));

        Aula aula = aulaRepository.findByAula(notaRequest.getAula())
                .stream().findFirst()
                .orElseThrow(() -> new BadRequestException("Aula no encontrada"));


        notaExistente.setAlumno(alumno);
        notaExistente.setDocente(docente);
        notaExistente.setCurso(curso);
        notaExistente.setAula(aula);
        notaExistente.setPracticas(notaRequest.getPracticas());
        notaExistente.setParcial(notaRequest.getParcial());

        int examenFinal = Math.round((notaRequest.getPracticas() + notaRequest.getParcial()) / 2.0f);
        notaExistente.setExamenFinal(examenFinal);

        return notaRepository.save(notaExistente);
    }

    @Override
    public void delete(Long id) {

        Nota nota = notaRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Nota con ID " + id + " no encontrada"));

        notaRepository.delete(nota);
    }

}
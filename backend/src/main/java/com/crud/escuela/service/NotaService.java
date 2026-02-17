package com.crud.escuela.service;

import com.crud.escuela.dto.AlumnoRequest;
import com.crud.escuela.dto.NotaRequest;
import com.crud.escuela.entity.Alumno;
import com.crud.escuela.entity.Curso;
import com.crud.escuela.entity.Docente;
import com.crud.escuela.entity.Nota;
import java.util.List;
import java.util.Optional;

public interface NotaService {

    List<Nota> findAll();

    Optional<Nota> findById(Long id);

    List<Nota> findByAlumno(Alumno alumno);

    List<Nota> findByCurso(Curso curso);

    List<Nota> findByDocente(Docente docente);

    List<Nota> findByAlumnoAndCurso(Alumno alumno, Curso curso);

    List<Nota> findByExamenFinalLessThanEqual(int notaMaxima);

    Nota save(NotaRequest alumno);

    Nota update(Long id , NotaRequest alumno);

    void delete(Long id);
}

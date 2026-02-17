package com.crud.escuela.repository;

import com.crud.escuela.entity.Alumno;
import com.crud.escuela.entity.Curso;
import com.crud.escuela.entity.Docente;
import com.crud.escuela.entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface NotaRepository extends JpaRepository<Nota,Long> {

    Optional<Nota> findById(Long id);

    List<Nota> findByAlumno(Alumno alumno);

    List<Nota> findByCurso(Curso curso);

    List<Nota> findByDocente(Docente docente);

    List<Nota> findByAlumnoAndCurso(Alumno alumno, Curso curso);

    List<Nota> findByExamenFinalLessThanEqual(int notaMaxima);

}

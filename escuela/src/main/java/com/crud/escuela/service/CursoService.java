package com.crud.escuela.service;

import com.crud.escuela.dto.CursoRequest;
import com.crud.escuela.entity.Curso;
import java.util.List;
import java.util.Optional;

public interface CursoService {

    List<Curso> findAll();

    Optional<Curso> findById(Long id);

    List<Curso> findByCurso(String curso);

    List<Curso> findByCredito(String credito);

    Curso save(CursoRequest cursoRequest);

    Curso update(Long id, CursoRequest cursoRequest);

    void delete(Long id);

}

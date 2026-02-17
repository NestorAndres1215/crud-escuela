package com.crud.escuela.repository;

import com.crud.escuela.entity.Aula;
import com.crud.escuela.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CursoRepository extends JpaRepository<Curso, Long> {

    Optional<Curso> findById(Long id);

    List<Curso> findByCurso(String curso);

    List<Curso> findByCredito(String credito);

}

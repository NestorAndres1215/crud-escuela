package com.crud.escuela.repository;

import com.crud.escuela.entity.Alumno;
import com.crud.escuela.entity.Aula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface AulaRepository extends JpaRepository<Aula, Long> {

    Optional<Aula> findById(Long id);

    List<Aula> findByAula(String aula);

    List<Aula> findByAforo(String aforo);

}

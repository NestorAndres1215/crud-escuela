package com.crud.escuela.service;


import com.crud.escuela.dto.AulaRequest;
import com.crud.escuela.entity.Alumno;
import com.crud.escuela.entity.Aula;

import java.util.List;
import java.util.Optional;

public interface AulaService {

    List<Aula> findAll();

    Optional<Aula> findById(Long id);

    List<Aula> findByAula(String aula);

    List<Aula> findByAforo(String aforo);

    Aula save(AulaRequest alumno);

    Aula update(Long id , AulaRequest alumno);

    void delete(Long id);
}

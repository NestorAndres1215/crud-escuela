package com.crud.escuela.service.impl;

import com.crud.escuela.dto.AulaRequest;
import com.crud.escuela.entity.Alumno;
import com.crud.escuela.entity.Aula;
import com.crud.escuela.exception.BadRequestException;
import com.crud.escuela.exception.ConflictException;
import com.crud.escuela.repository.AulaRepository;
import com.crud.escuela.service.AulaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AulaServiceImpl implements AulaService {

    private final AulaRepository aulaRepository;


    @Override
    public List<Aula> findAll() {
        return aulaRepository.findAll();
    }

    @Override
    public Optional<Aula> findById(Long id) {
        return aulaRepository.findById(id);
    }

    @Override
    public List<Aula> findByAula(String aula) {
        return aulaRepository.findByAula(aula);
    }

    @Override
    public List<Aula> findByAforo(String aforo) {
        return aulaRepository.findByAforo(aforo);
    }

    @Override
    public Aula save(AulaRequest request) {

        if (!aulaRepository.findByAula(request.getAula()).isEmpty()) {
            throw new ConflictException("El aula ya está registrado");
        }
        Aula aula = Aula.builder()
                .aula(request.getAula())
                .aforo(request.getAforo())
                .build();

        return aulaRepository.save(aula);
    }

    @Override
    public Aula update(Long id, AulaRequest request) {

        Aula aulaExistente = aulaRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Aula con ID " + id + " no encontrado"));

        aulaRepository.findByAula(request.getAula()).stream()
                .filter(a -> !a.getId().equals(id))
                .findFirst()
                .ifPresent(a -> {
                    throw new ConflictException("El aula ya está registrado");
                });


        aulaExistente.setAula(request.getAula());
        aulaExistente.setAforo(request.getAforo());

        return aulaRepository.save(aulaExistente);
    }

    @Override
    public void delete(Long id) {
        Aula aulaExistente = aulaRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Aula con ID " + id + " no encontrado"));
        aulaRepository.delete(aulaExistente);
    }
}

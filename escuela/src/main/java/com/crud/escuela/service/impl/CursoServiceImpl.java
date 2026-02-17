package com.crud.escuela.service.impl;

import com.crud.escuela.dto.CursoRequest;
import com.crud.escuela.entity.Curso;
import com.crud.escuela.exception.BadRequestException;
import com.crud.escuela.exception.ConflictException;
import com.crud.escuela.repository.CursoRepository;
import com.crud.escuela.service.CursoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CursoServiceImpl  implements CursoService {

    private final CursoRepository cursoRepository;


    @Override
    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }

    @Override
    public Optional<Curso> findById(Long id) {
        return cursoRepository.findById(id);
    }

    @Override
    public List<Curso> findByCurso(String curso) {
        return cursoRepository.findByCurso(curso);
    }

    @Override
    public List<Curso> findByCredito(String credito) {
        return cursoRepository.findByCredito(credito);
    }

    @Override
    public Curso save(CursoRequest cursoRequest) {

        if (!cursoRepository.findByCurso(cursoRequest.getCurso()).isEmpty()) {
            throw new ConflictException("El curso ya está registrado");
        }

        Curso curso = Curso.builder()
                .curso(cursoRequest.getCurso())
                .credito(cursoRequest.getCredito())
                .build();

        return  cursoRepository.save(curso);
    }

    @Override
    public Curso update(Long id, CursoRequest cursoRequest) {

        Curso cursoExistente = cursoRepository.findById(id)
                    .orElseThrow(() -> new BadRequestException("Curso con ID " + id + " no encontrado"));

        cursoRepository.findByCurso(cursoRequest.getCurso()).stream()
                .filter(a -> !a.getId().equals(id))
                .findFirst()
                .ifPresent(a -> {
                    throw new ConflictException("El curso ya está registrado");
                });


        cursoExistente.setCurso(cursoRequest.getCurso());
        cursoExistente.setCredito(cursoRequest.getCredito());

        return cursoRepository.save(cursoExistente);

    }

    @Override
    public void delete(Long id) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Curso con ID " + id + " no encontrado"));
        cursoRepository.delete(curso);
    }
}

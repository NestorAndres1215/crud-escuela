package com.crud.escuela.service.impl;

import com.crud.escuela.dto.AlumnoRequest;
import com.crud.escuela.entity.Alumno;
import com.crud.escuela.exception.BadRequestException;
import com.crud.escuela.exception.ConflictException;
import com.crud.escuela.repository.AlumnoRepository;
import com.crud.escuela.service.AlumnoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlumnoServiceImpl implements AlumnoService {

    private final AlumnoRepository alumnoRepository;
    
    
    @Override
    public List<Alumno> findAll() {
        return alumnoRepository.findAll();
    }

    @Override
    public Optional<Alumno> findById(Long id) {
        return alumnoRepository.findById(id);
    }

    @Override
    public List<Alumno> findByNombre(String nombre) {
        return alumnoRepository.findByNombre(nombre);
    }

    @Override
    public List<Alumno> findByApellido(String apellido) {
        return alumnoRepository.findByApellido(apellido);
    }

    @Override
    public List<Alumno> findByEmail(String email) {
        return alumnoRepository.findByEmail(email);
    }

    @Override
    public List<Alumno> findByTelefono(String telefono) {
        return alumnoRepository.findByTelefono(telefono);
    }

    @Override
    public List<Alumno> findByNombreAndApellido(String nombre, String apellido) {
        return findByNombreAndApellido(nombre,apellido);
    }

    @Override
    public Alumno save(AlumnoRequest request) {

        if (!alumnoRepository.findByEmail(request.getEmail()).isEmpty()) {
            throw new ConflictException("El email ya está registrado");
        }
        if (!alumnoRepository.findByTelefono(request.getTelefono()).isEmpty()) {
            throw new ConflictException("El teléfono ya está registrado");
        }
        Alumno alumno = Alumno.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .telefono(request.getTelefono())
                .build();

        return alumnoRepository.save(alumno);
    }


    @Override
    public Alumno update(Long id, AlumnoRequest request) {

        Alumno alumnoExistente = alumnoRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Alumno con ID " + id + " no encontrado"));

        alumnoRepository.findByEmail(request.getEmail()).stream()
                .filter(a -> !a.getId().equals(id))
                .findFirst()
                .ifPresent(a -> { throw new ConflictException("El email ya está registrado"); });

        alumnoRepository.findByTelefono(request.getTelefono()).stream()
                .filter(a -> !a.getId().equals(id))
                .findFirst()
                .ifPresent(a -> { throw new ConflictException("El teléfono ya está registrado"); });

        alumnoExistente.setNombre(request.getNombre());
        alumnoExistente.setApellido(request.getApellido());
        alumnoExistente.setEmail(request.getEmail());
        alumnoExistente.setTelefono(request.getTelefono());

        return alumnoRepository.save(alumnoExistente);
    }


    @Override
    public void delete(Long id) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Alumno con ID " + id + " no encontrado"));
        alumnoRepository.delete(alumno);
    }

}

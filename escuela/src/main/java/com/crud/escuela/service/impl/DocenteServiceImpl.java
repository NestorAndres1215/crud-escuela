package com.crud.escuela.service.impl;

import com.crud.escuela.dto.DocenteRequest;
import com.crud.escuela.entity.Docente;
import com.crud.escuela.exception.BadRequestException;
import com.crud.escuela.exception.ConflictException;
import com.crud.escuela.repository.DocenteRepository;
import com.crud.escuela.service.DocenteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocenteServiceImpl implements DocenteService {

    private final DocenteRepository docenteRepository;


    @Override
    public List<Docente> findAll() {
        return docenteRepository.findAll();
    }

    @Override
    public Optional<Docente> findById(Long id) {
        return docenteRepository.findById(id);
    }

    @Override
    public List<Docente> findByNombre(String nombre) {
        return docenteRepository.findByNombre(nombre);
    }

    @Override
    public List<Docente> findByApellido(String apellido) {
        return docenteRepository.findByApellido(apellido);
    }

    @Override
    public List<Docente> findByCorreo(String correo) {
        return docenteRepository.findByCorreo(correo);
    }

    @Override
    public List<Docente> findByTelefono(String telefono) {
        return docenteRepository.findByTelefono(telefono);
    }

    @Override
    public List<Docente> findByNombreAndApellido(String nombre, String apellido) {
        return docenteRepository.findByNombreAndApellido(nombre, apellido);
    }

    @Override
    public Docente save(DocenteRequest docenteRequest) {

        if (!docenteRepository.findByCorreo(docenteRequest.getEmail()).isEmpty()) {
            throw new ConflictException("El email ya está registrado");
        }
        if (!docenteRepository.findByTelefono(docenteRequest.getTelefono()).isEmpty()) {
            throw new ConflictException("El teléfono ya está registrado");
        }

        Docente docente = Docente.builder()
                .nombre(docenteRequest.getNombre())
                .apellido(docenteRequest.getApellido())
                .correo(docenteRequest.getEmail())
                .telefono(docenteRequest.getTelefono())
                .build();


        return docenteRepository.save(docente);
    }

    @Override
    public Docente update(Long id, DocenteRequest request) {

        Docente docenteExistente = docenteRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Docente con ID " + id + " no encontrado"));

        docenteRepository.findByCorreo(request.getEmail()).stream()
                .filter(d -> !d.getId().equals(id))
                .findFirst()
                .ifPresent(d -> { throw new ConflictException("El correo ya está registrado"); });

        docenteRepository.findByTelefono(request.getTelefono()).stream()
                .filter(d -> !d.getId().equals(id))
                .findFirst()
                .ifPresent(d -> { throw new ConflictException("El teléfono ya está registrado"); });

        docenteExistente.setNombre(request.getNombre());
        docenteExistente.setApellido(request.getApellido());
        docenteExistente.setCorreo(request.getEmail());
        docenteExistente.setTelefono(request.getTelefono());

        return docenteRepository.save(docenteExistente);
    }


    @Override
    public void delete(Long id) {
        Docente docente = docenteRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Alumno con ID " + id + " no encontrado"));
        docenteRepository.delete(docente);
    }
}

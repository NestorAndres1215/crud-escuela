package com.crud.escuela.dto;


import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class NotaRequest {

    @NotBlank(message = "El alumno no puede estar vacío")
    private String alumno;

    @NotBlank(message = "El curso no puede estar vacío")
    private String curso;

    @NotBlank(message = "El aula no puede estar vacía")
    private String aula;

    @NotBlank(message = "El docente no puede estar vacío")
    private String docente;

    @NotNull(message = "La nota de prácticas no puede ser nula")
    @Min(value = 0, message = "La nota de prácticas debe ser al menos 0")
    @Max(value = 20, message = "La nota de prácticas no puede ser mayor a 20")
    private Integer practicas;

    @NotNull(message = "La nota del parcial no puede ser nula")
    @Min(value = 0, message = "La nota del parcial debe ser al menos 0")
    @Max(value = 20, message = "La nota del parcial no puede ser mayor a 20")
    private Integer parcial;

}

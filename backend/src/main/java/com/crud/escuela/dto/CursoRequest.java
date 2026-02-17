package com.crud.escuela.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CursoRequest {

    @NotBlank(message = "El curso no puede estar vacío")
    @Size(max = 50, message = "El curso no puede tener más de 50 caracteres")
    private String curso;

    @NotBlank(message = "El credito no puede estar vacío")
    @Size(max = 50, message = "El credito no puede tener más de 50 caracteres")
    private String credito;
}

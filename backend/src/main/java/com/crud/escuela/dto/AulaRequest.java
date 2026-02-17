package com.crud.escuela.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AulaRequest {

    @NotBlank(message = "El aula no puede estar vacío")
    @Size(max = 50, message = "El aula no puede tener más de 50 caracteres")
    private String aula;

    @NotBlank(message = "El aforo no puede estar vacío")
    @Size(max = 50, message = "El aforo no puede tener más de 50 caracteres")
    private String aforo;
}

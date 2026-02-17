package com.crud.escuela.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "aulas")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Aula {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String aula;

	private String aforo;
}

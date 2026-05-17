package com.indoreathleteacademy.backend.core.Mapper;

public interface BaseMapper<E, D> {
    E toEntity(D dto);
    D toDto(E entity);
}

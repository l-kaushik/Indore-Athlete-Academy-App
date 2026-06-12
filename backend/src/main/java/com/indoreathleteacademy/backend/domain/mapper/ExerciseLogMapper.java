package com.indoreathleteacademy.backend.domain.mapper;

import com.indoreathleteacademy.backend.core.Mapper.BaseMapper;
import com.indoreathleteacademy.backend.domain.dtos.ExerciseLogDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ExerciseLogMapper extends BaseMapper<ExerciseLog, ExerciseLogDto> {

    @Mapping(target = "workoutId", source = "entity.workout.id")
    @Mapping(target = "assignmentExerciseId", source = "entity.assignmentExercise.id")
    ExerciseLogDto toDto(ExerciseLog entity);
}

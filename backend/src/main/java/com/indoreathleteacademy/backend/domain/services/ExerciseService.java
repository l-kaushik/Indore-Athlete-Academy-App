package com.indoreathleteacademy.backend.domain.services;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import org.springframework.data.domain.Page;

public interface ExerciseService {
    Page<ExerciseDto> getFilteredExercises(String name, ExerciseType type, MuscleGroup muscleGroup, int page, int size);
}
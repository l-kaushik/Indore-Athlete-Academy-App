package com.indoreathleteacademy.backend.domain.services;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import org.springframework.data.domain.Page;

import java.util.Map;
import java.util.UUID;

public interface WorkoutTemplateService {
    WorkoutTemplateDto createTemplate(WorkoutTemplateCreationDto dto);
    WorkoutTemplateDto getTemplateById(UUID id);
    WorkoutTemplateDto updateTemplate(UUID id, Map<String, String> body);

    ExerciseDto createExercise(UUID templateId, UUID exerciseId);
    Page<ExerciseDto> getExercises(UUID templateId, String name, ExerciseType type, MuscleGroup muscleGroup, int page, int size);

//    DELETE /api/v1/workout-templates/{id}

//    DELETE /api/v1/workout-templates/{id}/exercises/{exerciseId}
}

package com.indoreathleteacademy.backend.domain.services;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;

import java.util.UUID;

public interface WorkoutTemplateService {
    WorkoutTemplateDto createTemplate(WorkoutTemplateCreationDto dto);
    WorkoutTemplateDto getTemplateById(UUID id);

    ExerciseDto createExercise(UUID templateId, UUID exerciseId);


//    POST   /api/v1/workout-templates
//    GET    /api/v1/workout-templates

//    GET    /api/v1/workout-templates/{id}
//    PUT    /api/v1/workout-templates/{id}
//    DELETE /api/v1/workout-templates/{id}
//
//    GET    /api/v1/workout-templates/{id}/exercises
//    POST   /api/v1/workout-templates/{id}/exercises
//    PUT    /api/v1/workout-templates/{id}/exercises/{exerciseId}
//    DELETE /api/v1/workout-templates/{id}/exercises/{exerciseId}
}

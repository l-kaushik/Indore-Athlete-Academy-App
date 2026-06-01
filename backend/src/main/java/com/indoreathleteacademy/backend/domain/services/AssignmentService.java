package com.indoreathleteacademy.backend.domain.services;

import com.indoreathleteacademy.backend.domain.dtos.AssignmentCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentExerciseCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentExerciseDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.entities.workout.AssignmentStatus;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface AssignmentService {
    AssignmentDto createAssignment(AssignmentCreationDto dto);
    AssignmentDto getAssignmentById(UUID id);
    AssignmentDto updateStatus(UUID id, AssignmentStatus status);

    AssignmentExerciseDto createExercise(UUID assignmentId, AssignmentExerciseCreationDto dto);
    Page<AssignmentExerciseDto> getExercises(UUID assignmentId, String name, ExerciseType type, MuscleGroup muscleGroup, int page, int size);
}

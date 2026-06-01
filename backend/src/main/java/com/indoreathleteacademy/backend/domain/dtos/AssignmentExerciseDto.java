package com.indoreathleteacademy.backend.domain.dtos;

import com.indoreathleteacademy.backend.domain.entities.exercise.DefaultUnit;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;

import java.time.Duration;
import java.util.UUID;

public record AssignmentExerciseDto(
        UUID id,
        UUID assignmentId,
        UUID exerciseId,
        String exerciseName,
        ExerciseType exerciseType,
        DefaultUnit defaultUnit,
        Integer targetReps,
        Duration targetDuration,
        Integer targetWeight,
        Integer orderIndex
) {
}

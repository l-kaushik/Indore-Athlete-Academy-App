package com.indoreathleteacademy.backend.domain.dtos;

import java.time.Duration;
import java.util.UUID;

public record AssignmentExerciseDto(
        UUID id,
        UUID assignmentId,
        UUID exerciseId,
        String exerciseName,
        String exerciseType,
        String defaultUnit,
        Integer targetReps,
        Duration targetDuration,
        Integer targetWeight,
        Integer orderIndex
) {
}

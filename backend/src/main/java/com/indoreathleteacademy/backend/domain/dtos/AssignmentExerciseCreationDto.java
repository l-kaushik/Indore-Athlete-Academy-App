package com.indoreathleteacademy.backend.domain.dtos;

import java.time.Duration;
import java.util.UUID;

public record AssignmentExerciseCreationDto(
        UUID exerciseId,
        Integer targetReps,
        Duration targetDuration,
        Integer targetWeight
) {
}

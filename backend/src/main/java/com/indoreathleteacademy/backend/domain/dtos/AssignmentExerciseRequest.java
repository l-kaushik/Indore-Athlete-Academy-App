package com.indoreathleteacademy.backend.domain.dtos;

import java.time.Duration;
import java.util.UUID;

public record AssignmentExerciseRequest(
        UUID exerciseId,
        Integer targetReps,
        Duration targetDuration,
        Integer targetWeight
) {
}

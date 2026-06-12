package com.indoreathleteacademy.backend.domain.dtos;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

public record ExerciseLogDto(
        UUID id,
        UUID workoutId,
        UUID assignmentExerciseId,
        Integer setNumber,
        Integer actualWeight,
        Duration duration,
        Instant createdAt
) {
}

package com.indoreathleteacademy.backend.domain.dtos;

import java.time.Instant;
import java.util.UUID;

public record WorkoutDto(
    UUID id,
    UUID assignmentId,
    Instant start,
    Instant end,
    Instant createdAt
) {
}

package com.indoreathleteacademy.backend.domain.dtos;

import java.time.Instant;
import java.util.UUID;

public record WorkoutTemplateDto(
        UUID id,
        UUID trainerId,
        String name,
        String description,
        Instant createdAt,
        long exerciseCount
) {
}

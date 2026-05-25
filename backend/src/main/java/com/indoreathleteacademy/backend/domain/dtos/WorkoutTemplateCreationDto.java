package com.indoreathleteacademy.backend.domain.dtos;

import java.util.UUID;

public record WorkoutTemplateCreationDto(
        UUID trainerId,
        String name,
        String description
) {
}

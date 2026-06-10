package com.indoreathleteacademy.backend.domain.dtos;

import java.util.List;
import java.util.UUID;

public record WorkoutTemplateCreationDto(
        UUID trainerId,
        String name,
        String description,
        List<UUID> exercises
) {
}

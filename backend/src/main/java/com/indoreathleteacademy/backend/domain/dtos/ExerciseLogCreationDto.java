package com.indoreathleteacademy.backend.domain.dtos;

import java.time.Duration;
import java.util.UUID;

public record ExerciseLogCreationDto(
     UUID assignmentExerciseId,
     Integer setNumber,
     Integer actualWeight,
     Duration duration
) {
}

package com.indoreathleteacademy.backend.domain.dtos;

import com.indoreathleteacademy.backend.domain.entities.workout.AssignmentStatus;

import java.util.UUID;

public record AssignmentCreationDto(
        UUID templateId,
        UUID studentId,
        UUID trainerId,
        AssignmentStatus status
) {
}

package com.indoreathleteacademy.backend.domain.dtos;

import com.indoreathleteacademy.backend.domain.entities.workout.AssignmentStatus;

import java.time.Instant;
import java.util.UUID;

public record AssignmentDto(
        UUID id,
        UUID templateId,
        UUID studentId,
        UUID trainerId,
        AssignmentStatus status,
        Instant assignedAt,
        long exerciseCount
) {
}

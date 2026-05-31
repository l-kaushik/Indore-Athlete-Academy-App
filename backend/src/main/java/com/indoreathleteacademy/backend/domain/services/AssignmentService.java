package com.indoreathleteacademy.backend.domain.services;

import com.indoreathleteacademy.backend.domain.dtos.AssignmentCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;

import java.util.UUID;

public interface AssignmentService {
    AssignmentDto createAssignment(AssignmentCreationDto dto);
}

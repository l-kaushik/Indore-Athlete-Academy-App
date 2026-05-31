package com.indoreathleteacademy.backend.domain.services.impl;

import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignment;
import com.indoreathleteacademy.backend.domain.mapper.AssignmentMapper;
import com.indoreathleteacademy.backend.domain.repositories.AssignmentRepository;
import com.indoreathleteacademy.backend.domain.repositories.WorkoutTemplateRepository;
import com.indoreathleteacademy.backend.domain.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {
    private final AssignmentRepository repository;
    private final AssignmentMapper mapper;
    private final UserAuthRepository authRepository;
    private final WorkoutTemplateRepository templateRepository;

    @Override
    public AssignmentDto createAssignment(AssignmentCreationDto dto) {
        log.info("Creating assignment");

        WorkoutAssignment assignment = WorkoutAssignment.builder()
                .student(authRepository.getReferenceById(dto.studentId()))
                .trainer(authRepository.getReferenceById(dto.trainerId()))
                .template(templateRepository.getReferenceById(dto.templateId()))
                .status(dto.status())
                .build();

        return mapper.toDto(repository.save(assignment));
    }

}

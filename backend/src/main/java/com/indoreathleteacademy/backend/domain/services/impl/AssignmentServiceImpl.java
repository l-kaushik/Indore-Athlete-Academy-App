package com.indoreathleteacademy.backend.domain.services.impl;

import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.domain.dtos.*;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignment;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignmentExercise;
import com.indoreathleteacademy.backend.domain.mapper.AssignmentMapper;
import com.indoreathleteacademy.backend.domain.repositories.AssignmentExerciseRepository;
import com.indoreathleteacademy.backend.domain.repositories.AssignmentRepository;
import com.indoreathleteacademy.backend.domain.repositories.ExerciseMasterRepository;
import com.indoreathleteacademy.backend.domain.repositories.WorkoutTemplateRepository;
import com.indoreathleteacademy.backend.domain.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final AssignmentExerciseRepository assignmentExerciseRepository;
    private final ExerciseMasterRepository exerciseMasterRepository;

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

    @Override
    public AssignmentDto getAssignmentById(UUID id) {
        return repository.findByIdWithExerciseCount(id).orElseThrow(() ->
                new IllegalArgumentException("Workout assignment not found!!"));
    }

    @Override
    public AssignmentExerciseDto createExercise(UUID assignmentId, AssignmentExerciseCreationDto dto) {
        log.info("Adding exercise reference for assignment");

        int orderIndex = assignmentExerciseRepository.findMaxOrderIndexByAssignmentId(assignmentId);
        var exercise = exerciseMasterRepository.findById(dto.exerciseId()).orElseThrow(
                () -> new IllegalArgumentException("Exercise not found !!")
        );

        WorkoutAssignmentExercise assignmentExercise = WorkoutAssignmentExercise.builder()
                .assignment(repository.getReferenceById(assignmentId))
                .exercise(exercise)
                .exerciseNameSnapshot(exercise.getName())
                .exerciseTypeSnapshot(exercise.getType())
                .defaultUnitSnapshot(exercise.getDefaultUnit())
                .targetDuration(dto.targetDuration())
                .targetReps(dto.targetReps())
                .targetWeight(dto.targetWeight())
                .orderIndex(++orderIndex)
                .build();

        return mapper.toDto(assignmentExerciseRepository.save(assignmentExercise));
    }

    @Override
    public Page<AssignmentExerciseDto> getExercises(UUID assignmentId, String name, ExerciseType type, MuscleGroup muscleGroup, int page, int size) {
        log.info("Fetching exercises for a workout assignment request");
        Pageable pageable = PageRequest.of(page, size);
        String normalizedName = name != null ? name.toLowerCase() : null;
        return assignmentExerciseRepository.findByAssignmentId(assignmentId, normalizedName, type, muscleGroup, pageable);
    }

}

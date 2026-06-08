package com.indoreathleteacademy.backend.domain.services.impl;

import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentExerciseDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentExerciseRequest;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.entities.workout.AssignmentStatus;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignment;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignmentExercise;
import com.indoreathleteacademy.backend.domain.mapper.AssignmentMapper;
import com.indoreathleteacademy.backend.domain.repositories.*;
import com.indoreathleteacademy.backend.domain.services.AssignmentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {
    private final AssignmentRepository repository;
    private final AssignmentMapper mapper;
    private final UserAuthRepository authRepository;
    private final WorkoutTemplateRepository templateRepository;
    private final WorkoutTemplateExerciseRepository templateExerciseRepository;
    private final AssignmentExerciseRepository assignmentExerciseRepository;
    private final ExerciseMasterRepository exerciseMasterRepository;

    @Override
    @Transactional
    public AssignmentDto createAssignment(AssignmentCreationDto dto) {
        log.info("Creating assignment");

        validTemplateAndExercise(dto.templateId(), dto.exercises());

        WorkoutAssignment assignment = WorkoutAssignment.builder()
                .student(authRepository.getReferenceById(dto.studentId()))
                .trainer(authRepository.getReferenceById(dto.trainerId()))
                .template(templateRepository.getReferenceById(dto.templateId()))
                .status(dto.status())
                .build();

        WorkoutAssignment savedAssignment = repository.save(assignment);
        long exerciseCount = createExercises(savedAssignment.getId(), dto.exercises());

        return mapper.toDto(savedAssignment, exerciseCount);
    }

    @Override
    public AssignmentDto getAssignmentById(UUID id) {
        return repository.findByIdWithExerciseCount(id).orElseThrow(() ->
                new IllegalArgumentException("Workout assignment not found!!"));
    }

    @Override
    public AssignmentDto updateStatus(UUID id, AssignmentStatus status) {
        WorkoutAssignment assignment = repository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Workout assignment not found!!")
        );

        if(assignment.getStatus().equals(status)) {
            return mapper.toDto(assignment);
        }

        assignment.setStatus(status);

        return mapper.toDto(repository.save(assignment));
    }

    private void validTemplateAndExercise(UUID templateId, List<AssignmentExerciseRequest> exerciseRequests) {
        log.info("Checking exercise and template exercise match");

        Set<UUID> templateExercises = templateExerciseRepository.findAllByTemplateId(templateId)
                .stream()
                .map(wte -> wte.getExerciseMaster().getId())
                .collect(Collectors.toSet());

        Set<UUID> requestExerciseIds = exerciseRequests.stream()
                .map(AssignmentExerciseRequest::exerciseId).collect(Collectors.toSet());

        if(templateExercises.size() != requestExerciseIds.size()) {
            throw new IllegalArgumentException("Exercise count mismatch against provided template");
        }

        if(!templateExercises.containsAll(requestExerciseIds)){
            throw new IllegalArgumentException("Exercise does not belong to template");
        }
    }

    private long createExercises(UUID assignmentId, List<AssignmentExerciseRequest> exerciseRequests) {
        log.info("Adding exercise reference for assignment");

        int orderIndex = assignmentExerciseRepository.findMaxOrderIndexByAssignmentId(assignmentId);
        List<WorkoutAssignmentExercise> assignmentExercises = new ArrayList<>();

        for(var dto : exerciseRequests) {
            var exercise = exerciseMasterRepository.findById(dto.exerciseId()).orElseThrow(
                    () -> new IllegalArgumentException("Exercise not found!!")
            );

            var workoutAssignmentExercise = WorkoutAssignmentExercise.builder()
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

            assignmentExercises.add(workoutAssignmentExercise);
        }
        return assignmentExerciseRepository.saveAll(assignmentExercises).size();
    }

    @Override
    public Page<AssignmentExerciseDto> getExercises(UUID assignmentId, String name, ExerciseType type, MuscleGroup muscleGroup, int page, int size) {
        log.info("Fetching exercises for a workout assignment request");
        Pageable pageable = PageRequest.of(page, size);
        String normalizedName = name != null ? name.toLowerCase() : null;
        return assignmentExerciseRepository.findByAssignmentId(assignmentId, normalizedName, type, muscleGroup, pageable);
    }

}

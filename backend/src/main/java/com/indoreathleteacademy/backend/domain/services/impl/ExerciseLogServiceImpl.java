package com.indoreathleteacademy.backend.domain.services.impl;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseLogCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.ExerciseLogDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseLog;
import com.indoreathleteacademy.backend.domain.mapper.ExerciseLogMapper;
import com.indoreathleteacademy.backend.domain.repositories.AssignmentExerciseRepository;
import com.indoreathleteacademy.backend.domain.repositories.ExerciseLogRepository;
import com.indoreathleteacademy.backend.domain.repositories.WorkoutRepository;
import com.indoreathleteacademy.backend.domain.services.ExerciseLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExerciseLogServiceImpl implements ExerciseLogService {
    private final ExerciseLogMapper mapper;
    private final ExerciseLogRepository repository;
    private final WorkoutRepository workoutRepository;
    private final AssignmentExerciseRepository assignmentExerciseRepository;

    @Override
    public ExerciseLogDto createExerciseLog(UUID workoutId, ExerciseLogCreationDto dto) {
        ExerciseLog exerciseLog = ExerciseLog.builder()
                .workout(workoutRepository.getReferenceById(workoutId))
                .assignmentExercise(assignmentExerciseRepository.getReferenceById(dto.assignmentExerciseId()))
                .actualWeight(dto.actualWeight())
                .setNumber(dto.setNumber())
                .duration(dto.duration())
                .build();

        return mapper.toDto(repository.save(exerciseLog));
    }

    @Override
    public Page<ExerciseLogDto> getExerciseLog(UUID workoutId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findByWorkoutId(workoutId, pageable);
    }
}

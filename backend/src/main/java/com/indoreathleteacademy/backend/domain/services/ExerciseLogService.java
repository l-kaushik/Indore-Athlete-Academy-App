package com.indoreathleteacademy.backend.domain.services;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseLogCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.ExerciseLogDto;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface ExerciseLogService {
    ExerciseLogDto createExerciseLog(UUID workoutId, ExerciseLogCreationDto dto);
    Page<ExerciseLogDto> getExerciseLog(UUID workoutId, int page, int size);
}

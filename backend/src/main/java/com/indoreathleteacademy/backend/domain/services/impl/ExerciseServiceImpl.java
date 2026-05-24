package com.indoreathleteacademy.backend.domain.services.impl;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.mapper.ExerciseMapper;
import com.indoreathleteacademy.backend.domain.repositories.ExerciseMasterRepository;
import com.indoreathleteacademy.backend.domain.services.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseMasterRepository exerciseMasterRepository;
    private final ExerciseMapper exerciseMapper;

    public Page<ExerciseDto> getFilteredExercises(String name, ExerciseType type, MuscleGroup muscleGroup, int page, int size) {
        // TODO: can add sorting for better filter
        Pageable pageable = PageRequest.of(page, size);
        String normalizedName = name != null ? name.toLowerCase() : null;
        return exerciseMasterRepository.findFilteredExercise(normalizedName, type, muscleGroup, pageable)
                .map(exerciseMapper::toDto);
    }
}

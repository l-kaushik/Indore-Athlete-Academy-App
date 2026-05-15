package com.indoreathleteacademy.backend.domain.dtos;

import com.indoreathleteacademy.backend.domain.entities.exercise.DefaultUnit;
import com.indoreathleteacademy.backend.domain.entities.exercise.EquipmentNeeded;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;


public record ExerciseSeedDto(
        String name,
        ExerciseType type,
        DefaultUnit defaultUnit,
        MuscleGroup muscleGroup,
        EquipmentNeeded equipmentNeeded,
        String description
) {
}

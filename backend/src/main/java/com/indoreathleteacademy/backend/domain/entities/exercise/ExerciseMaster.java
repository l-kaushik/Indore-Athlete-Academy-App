package com.indoreathleteacademy.backend.domain.entities.exercise;

import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exercise_master")
@Getter
@Setter
@Builder
public class ExerciseMaster extends BaseEntity {

    @Column(nullable = false, unique = true, length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExerciseType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "default_unit", nullable = false)
    private DefaultUnit defaultUnit;

    @Enumerated(EnumType.STRING)
    @Column(name = "muscle_group", nullable = false)
    private MuscleGroup muscleGroup;

    @Enumerated(EnumType.STRING)
    @Column(name = "equipment_needed", nullable = false)
    private EquipmentNeeded equipmentNeeded;

    @Column(length = 1000)
    private String description;
}

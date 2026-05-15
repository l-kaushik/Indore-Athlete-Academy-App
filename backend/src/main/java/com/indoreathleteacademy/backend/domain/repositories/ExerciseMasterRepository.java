package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExerciseMasterRepository extends JpaRepository<ExerciseMaster, UUID> {
    boolean existsByName(String name);
}

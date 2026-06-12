package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseLogDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ExerciseLogRepository extends JpaRepository<ExerciseLog, UUID> {
    Page<ExerciseLogDto> findByWorkoutId(@Param("id") UUID workoutId, Pageable pageable);
}

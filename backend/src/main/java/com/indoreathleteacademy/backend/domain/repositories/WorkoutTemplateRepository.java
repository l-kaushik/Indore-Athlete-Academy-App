package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface WorkoutTemplateRepository extends JpaRepository<WorkoutTemplate, UUID> {

    @Query("""
       SELECT new com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto(
            wt.id,
            wt.trainer.id,
            wt.name,
            wt.description,
            wt.createdAt,
            COUNT(wte.id)
       )
       FROM WorkoutTemplate wt
       LEFT JOIN WorkoutTemplateExercise wte
       ON wte.template.id = wt.id
       WHERE wt.id = :id
       GROUP BY
            wt.id,
            wt.trainer.id,
            wt.name,
            wt.description,
            wt.createdAt
       """)
    Optional<WorkoutTemplateDto> findByIdWithExerciseCount(UUID id);
}

package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplateExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface WorkoutTemplateExerciseRepository extends JpaRepository<WorkoutTemplateExercise, UUID> {
    @Query("""
        SELECT COALESCE(Max(w.orderIndex), 0)
        FROM WorkoutTemplateExercise w
        WHERE w.template.id = :templateId
    """)
    Integer findMaxOrderIndexByTemplateId(UUID templateId);
}

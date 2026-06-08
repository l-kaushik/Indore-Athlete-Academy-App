package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplateExercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface WorkoutTemplateExerciseRepository extends JpaRepository<WorkoutTemplateExercise, UUID> {
    @Query("""
        SELECT COALESCE(Max(w.orderIndex), 0)
        FROM WorkoutTemplateExercise w
        WHERE w.template.id = :templateId
    """)
    Integer findMaxOrderIndexByTemplateId(UUID templateId);

    @Query("""
    SELECT new com.indoreathleteacademy.backend.domain.dtos.ExerciseDto(
        em.id,
        em.name,
        em.type,
        em.defaultUnit,
        em.muscleGroup,
        em.equipmentNeeded,
        em.description
       )
    FROM WorkoutTemplateExercise wte
    JOIN wte.exerciseMaster em
    WHERE wte.template.id = :templateId
      AND (:name IS NULL OR LOWER(wte.exerciseMaster.name) = :name)
      AND (:type IS NULL OR wte.exerciseMaster.type = :type)
      AND (:muscleGroup IS NULL OR wte.exerciseMaster.muscleGroup = :muscleGroup)
    """)
    Page<ExerciseDto> findByTemplateId(
            @Param("templateId") UUID templateId,
            @Param("name") String name,
            @Param("type") ExerciseType type,
            @Param("muscleGroup") MuscleGroup muscleGroup,
            Pageable pageable
    );

    List<WorkoutTemplateExercise> findAllByTemplateId(UUID templateId);
}

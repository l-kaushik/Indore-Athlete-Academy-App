package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.dtos.AssignmentExerciseDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignmentExercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface AssignmentExerciseRepository extends JpaRepository<WorkoutAssignmentExercise, UUID> {
    @Query("""
        SELECT COALESCE(Max(w.orderIndex), 0)
        FROM WorkoutAssignmentExercise w
        WHERE w.assignment.id = :assignmentId
    """)
    Integer findMaxOrderIndexByAssignmentId(UUID assignmentId);

    @Query("""
    SELECT new com.indoreathleteacademy.backend.domain.dtos.AssignmentExerciseDto(
        wae.id,
        wae.assignment.id,
        wae.exercise.id,
        wae.exerciseNameSnapshot,
        wae.exerciseTypeSnapshot,
        wae.defaultUnitSnapshot,
        wae.targetReps,
        wae.targetDuration,
        wae.targetWeight,
        wae.orderIndex
       )
    FROM WorkoutAssignmentExercise wae
    JOIN wae.exercise em
    WHERE wae.assignment.id = :assignmentId
      AND (:name IS NULL OR LOWER(wae.exercise.name) = :name)
      AND (:type IS NULL OR wae.exercise.type = :type)
      AND (:muscleGroup IS NULL OR wae.exercise.muscleGroup = :muscleGroup)
    """)
    Page<AssignmentExerciseDto> findByAssignmentId(
            @Param("assignmentId") UUID assignmentId,
            @Param("name") String name,
            @Param("type") ExerciseType type,
            @Param("muscleGroup") MuscleGroup muscleGroup,
            Pageable pageable
    );
}

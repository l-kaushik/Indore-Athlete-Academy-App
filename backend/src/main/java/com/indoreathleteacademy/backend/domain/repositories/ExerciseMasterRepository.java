package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseMaster;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ExerciseMasterRepository extends JpaRepository<ExerciseMaster, UUID> {
    boolean existsByName(String name);

    @Query("""
        SELECT e FROM ExerciseMaster e
        WHERE (:name IS NULL OR LOWER(e.name) = :name)
        AND (:type IS NULL OR e.type = :type)
        AND (:muscleGroup IS NULL OR e.muscleGroup = :muscleGroup)
    """)
    Page<ExerciseMaster> findFilteredExercise(
            @Param("name") String name,
            @Param("type") ExerciseType type,
            @Param("muscleGroup") MuscleGroup muscleGroup,
            Pageable pageable
    );
}

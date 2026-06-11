package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.entities.workout.Workout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<Workout, UUID> {
    @Query(
    """
        SELECT w
        FROM Workout w
        WHERE w.assignment.student.id = :id
    """
    )
    Page<Workout> findByStudentId(@Param("id") UUID id, Pageable pageable);
}

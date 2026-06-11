package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface AssignmentRepository extends JpaRepository<WorkoutAssignment, UUID> {
    @Query("""
        SELECT new com.indoreathleteacademy.backend.domain.dtos.AssignmentDto(
            wa.id,
            wa.template.id,
            wa.student.id,
            wa.trainer.id,
            wa.status,
            wa.createdAt,
            COUNT(wae.id)
        )
        FROM WorkoutAssignment wa
        LEFT JOIN WorkoutAssignmentExercise wae
            ON wae.assignment.id = wa.id
        WHERE wa.id = :id
        GROUP BY
            wa.id,
            wa.template.id,
            wa.student.id,
            wa.trainer.id,
            wa.status,
            wa.createdAt
    """)
    Optional<AssignmentDto> findByIdWithExerciseCount(@Param("id") UUID id);

    @Query("""
        SELECT new com.indoreathleteacademy.backend.domain.dtos.AssignmentDto(
            wa.id,
            wa.template.id,
            wa.student.id,
            wa.trainer.id,
            wa.status,
            wa.createdAt,
            COUNT(wae.id)
        )
        FROM WorkoutAssignment wa
        LEFT JOIN WorkoutAssignmentExercise wae
            ON wae.assignment.id = wa.id
        WHERE wa.student.id = :id
        GROUP BY
            wa.id,
            wa.template.id,
            wa.student.id,
            wa.trainer.id,
            wa.status,
            wa.createdAt
    """)
    Page<AssignmentDto> findAllByStudentId(@Param("id") UUID studentId, Pageable pageable);
}

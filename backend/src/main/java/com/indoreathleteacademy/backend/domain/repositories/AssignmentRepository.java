package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface AssignmentRepository extends JpaRepository<WorkoutAssignment, UUID> {
}

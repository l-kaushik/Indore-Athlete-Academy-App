package com.indoreathleteacademy.backend.domain.repositories;

import com.indoreathleteacademy.backend.domain.entities.workout.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<Workout, UUID> {
}

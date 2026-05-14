package com.indoreathleteacademy.backend.domain.entities.exercise;

import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import com.indoreathleteacademy.backend.domain.entities.workout.Workout;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignmentExercise;
import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;

@Entity
@Table(name = "exercise_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExerciseLog extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_exercise_id", nullable = false)
    private WorkoutAssignmentExercise assignmentExercise;

    @Column(name = "set_number")
    private Integer setNumber;

    @Column(nullable = false)
    private Duration duration;

    // TODO: if student ever perform with less/more weight than assigned, then we must track it here else no need
}

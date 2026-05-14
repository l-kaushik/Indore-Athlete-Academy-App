package com.indoreathleteacademy.backend.domain.entities.workout;

import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseMaster;
import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;

@Entity
@Table(name = "workout_assignment_exercise",
    uniqueConstraints = {
            @UniqueConstraint(
                    columnNames = {"assignment_id", "order_index"}
            )
    }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutAssignmentExercise extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private WorkoutAssignment assignment;

    // TODO: Think about how to make sure change in ExerciseMaster doesn't mess with assignment
    //  1st solution, instead of join with ExerciseMaster, place actual fields
//    private String exerciseNameSnapshot;
//    private ExerciseType exerciseTypeSnapshot;
//    private DefaultUnit defaultUnitSnapshot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private ExerciseMaster exercise;

    @Column(name = "target_reps")
    private Integer targetReps;

    @Column(name = "target_duration")
    private Duration targetDuration;

    @Column(name = "target_weight")
    private Duration targetWeight;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
}

package com.indoreathleteacademy.backend.domain.entities.workout;

import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseMaster;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "workout_template_exercise",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"template_id", "order_index"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutTemplateExercise extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", nullable = false)
    private WorkoutTemplate template;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private ExerciseMaster exerciseMaster;

    // sequence for exercise
    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
}

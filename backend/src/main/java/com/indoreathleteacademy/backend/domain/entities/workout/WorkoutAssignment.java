package com.indoreathleteacademy.backend.domain.entities.workout;

import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "workout_assignment")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutAssignment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", nullable = false)
    private WorkoutTemplate template;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private UserAuth student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainer_id", nullable = false)
    private UserAuth trainer;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AssignmentStatus status;

    public Instant getAssignedAt() {
        return getCreatedAt();
    }
}

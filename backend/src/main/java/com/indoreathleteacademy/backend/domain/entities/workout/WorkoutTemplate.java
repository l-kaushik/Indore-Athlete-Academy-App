package com.indoreathleteacademy.backend.domain.entities.workout;

import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workout_template")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutTemplate extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainer_id", nullable = false)
    private UserAuth trainer;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;
}

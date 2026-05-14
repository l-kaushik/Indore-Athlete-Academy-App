package com.indoreathleteacademy.backend.domain.entities.workout;

import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Workout extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private UserAuth student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainer_id", nullable = false)
    private UserAuth trainer;

    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @Column(name = "end_time", nullable = false)
    private Instant endTime;

    // Todo: add other workout related information ex: calories burned

}

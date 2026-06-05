package com.indoreathleteacademy.backend.domain.entities.workout;

import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Workout extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "assignment_id", nullable = false)
    private WorkoutAssignment assignment;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    // Todo: add other workout related information ex: calories burned

}

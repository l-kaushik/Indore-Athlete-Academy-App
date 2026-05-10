package com.indoreathleteacademy.backend.auth.entities;

import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "auth_id", unique = true)
    private UserAuth auth;

    // TODO: update to nullable = false only after client confirmation
    private String fullName;
    private LocalDate dob;
    @Embedded
    private Address address;
}

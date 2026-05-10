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
    @OneToOne(mappedBy = "user")
    private UserAuth auth;

    // TODO: update to nullable = false only after client confirmation
    private String profileImage;
    private String fullName;
    private LocalDate dob;
    @Embedded
    private Address address;
}

package com.indoreathleteacademy.backend.auth.entities;

import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAuth extends BaseEntity {

    @OneToOne(mappedBy = "auth")
    User user;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String emailId;

    private String passwordHash;

    private boolean enabled;
    private boolean locked;

    // roles and permission
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "auth_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"auth_id", "role_id"})
    )
    private Set<Role> roles = new HashSet<>();

    // oauth provider details
    private String oauthId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Provider provider;
}

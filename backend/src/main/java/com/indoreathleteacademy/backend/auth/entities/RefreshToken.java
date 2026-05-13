package com.indoreathleteacademy.backend.auth.entities;

import com.fasterxml.uuid.Generators;
import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import com.indoreathleteacademy.backend.core.utils.CoreUtils;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;


@Entity
@Table(name = "refresh_tokens", indexes = {
        @Index(name = "refresh_tokens_jti_idx", columnList = "jti", unique = true),
        @Index(name = "refresh_tokens_user_auth_idx", columnList = "userAuth_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {
    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(name = "jti", unique = true, nullable = false, updatable = false)
    private UUID jti;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "userAuth_id", nullable = false, updatable = false)
    private UserAuth userAuth;

    @Column(updatable = false, nullable = false)
    private Instant createdAt;

    @Column(updatable = false, nullable = false)
    private Instant expiresAt;

    @Column(nullable = false)
    private boolean revoked;

    private UUID replacedByToken;

    @PrePersist
    public void generateId() {
        if(id == null) {
            id = CoreUtils.generateUuidV7();
        }
    }

    public static RefreshToken of(UUID jti, UserAuth userAuth, Instant expiresAt) {
        return RefreshToken.builder()
                .jti(jti)
                .userAuth(userAuth)
                .createdAt(Instant.now())
                .expiresAt(expiresAt)
                .revoked(false)
                .build();
    }
}

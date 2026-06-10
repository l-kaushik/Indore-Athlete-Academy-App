package com.indoreathleteacademy.backend.core.entities;

import com.indoreathleteacademy.backend.core.utils.CoreUtils;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@MappedSuperclass
@Getter
@NoArgsConstructor
public abstract class BaseEntity {
    @Id
    private UUID id;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    protected void generateId() {
        id = CoreUtils.generateUuidV7();
    }

    protected void setCreatedAt() {
        createdAt = Instant.now();
        updatedAt = createdAt;
    }

    @PrePersist
    protected void prePersist() {
        generateId();
        setCreatedAt();
    }

    @PreUpdate
    protected void preUpdate() {
        updatedAt = Instant.now();
    }
}

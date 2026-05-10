package com.indoreathleteacademy.backend.auth.entities;

import com.indoreathleteacademy.backend.core.entities.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
public class Role extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String name;
}

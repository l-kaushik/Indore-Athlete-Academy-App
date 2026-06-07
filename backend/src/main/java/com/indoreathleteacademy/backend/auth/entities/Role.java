package com.indoreathleteacademy.backend.auth.entities;

import java.util.Set;

public enum Role {
    STUDENT(Set.of(
            Permission.ASSIGNMENT_CREATE
    )),
    TRAINER( Set.of(
            Permission.ASSIGNMENT_CREATE,
            Permission.ASSIGNMENT_UPDATE,
            Permission.ASSIGNMENT_DELETE,

            Permission.WORKOUT_CREATE,
            Permission.WORKOUT_UPDATE,
            Permission.WORKOUT_DELETE
    )),
    ADMIN(Set.of(
            Permission.values()
    ));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

}

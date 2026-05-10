package com.indoreathleteacademy.backend.auth.dtos;

import com.indoreathleteacademy.backend.auth.entities.Address;
import com.indoreathleteacademy.backend.auth.entities.Provider;
import com.indoreathleteacademy.backend.auth.entities.Role;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

public record UserDto(
        UUID id,
        String email,
        String username,
        String fullName,
        Address address,
        LocalDate dob,
        String profileImage,
        Instant createdAt,
        Instant updatedAt,
        Provider provider,
        Set<Role> roles
) {
}

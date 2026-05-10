package com.indoreathleteacademy.backend.auth.dtos;

import com.indoreathleteacademy.backend.auth.entities.Address;

import java.time.LocalDate;

public record UserRegisterDto(
        String email,
        String username,
        String password,
        String fullName,
        Address address,
        LocalDate dob
) {
}

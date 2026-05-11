package com.indoreathleteacademy.backend.auth.dtos;

import com.indoreathleteacademy.backend.auth.entities.Address;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UserRegisterDto(

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        @Pattern(
                regexp = "^[A-Za-z0-9_]{6,25}$",
                message = "Username must contain only letters, numbers, and underscores and be 6-25 characters long"
        )
        String username,

        @NotBlank(message = "Password is required")
        @Size(
                min = 8,
                max = 100,
                message = "Password must be between 8 and 100 characters"
        )
        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&._-])[A-Za-z\\d@$!%*#?&._-]+$",
                message = "Password must contain at least one letter, one number, and one special character"
        )
        String password,

        @Size(
                min = 2,
                max = 100,
                message = "Full name must be between 2 and 100 characters"
        )
        String fullName,

        Address address,

        @Past(message = "Date of birth must be in the past")
        LocalDate dob
) {
}

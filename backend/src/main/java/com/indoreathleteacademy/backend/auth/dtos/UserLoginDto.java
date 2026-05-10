package com.indoreathleteacademy.backend.auth.dtos;

public record UserLoginDto(
        String username,
        String emailId,
        String password
) {
}

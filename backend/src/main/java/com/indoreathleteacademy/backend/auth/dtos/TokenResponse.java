package com.indoreathleteacademy.backend.auth.dtos;

public record TokenResponse(
        String accessToken,
        String refreshToken,
        long accessTokenExpiresIn,
        long refreshTokenExpiresIn
) {
}

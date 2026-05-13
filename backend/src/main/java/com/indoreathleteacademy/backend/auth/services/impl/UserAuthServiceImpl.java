package com.indoreathleteacademy.backend.auth.services.impl;

import com.indoreathleteacademy.backend.auth.dtos.UserLoginDto;
import com.indoreathleteacademy.backend.auth.dtos.TokenResponse;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.auth.security.JwtService;
import com.indoreathleteacademy.backend.auth.services.UserAuthService;
import com.indoreathleteacademy.backend.auth.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserAuthServiceImpl implements UserAuthService {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public void register(UserRegisterDto dto) {
        userService.createUser(dto);
    }

    @Override
    public TokenResponse login(UserLoginDto dto) {
        log.info("Authentication attempt for user {}", dto.identifier());
        Authentication authenticated = authenticate(dto);
        UserAuth userAuth = (UserAuth) authenticated.getPrincipal();

        String accessToken = jwtService.generateAccessToken(userAuth);

        return new TokenResponse(accessToken, "", jwtService.getAccessTtlSeconds(), 0);
    }

    private Authentication authenticate(UserLoginDto dto) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.identifier(), dto.password()));
    }
}

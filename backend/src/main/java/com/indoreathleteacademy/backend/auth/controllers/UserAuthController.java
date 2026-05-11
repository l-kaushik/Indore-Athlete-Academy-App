package com.indoreathleteacademy.backend.auth.controllers;

import com.indoreathleteacademy.backend.auth.dtos.UserDto;
import com.indoreathleteacademy.backend.auth.dtos.UserLoginDto;
import com.indoreathleteacademy.backend.auth.dtos.UserLoginResponseDto;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.services.UserAuthService;
import com.indoreathleteacademy.backend.auth.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/auth")
public class UserAuthController {

    private final UserAuthService authService;

//    ---------------------------------------------- PUBLIC ENDPOINTS ------------------------------------------------
    // login
    // logout

    @PostMapping("/register")
    ResponseEntity<?> register(@RequestBody UserRegisterDto dto) {
        authService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    ResponseEntity<UserLoginResponseDto> login(@RequestBody UserLoginDto dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

//    ---------------------------------------------- PRIVATE ENDPOINTS ------------------------------------------------

}

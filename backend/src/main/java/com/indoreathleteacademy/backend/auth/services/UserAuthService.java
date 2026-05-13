package com.indoreathleteacademy.backend.auth.services;

import com.indoreathleteacademy.backend.auth.dtos.UserLoginDto;
import com.indoreathleteacademy.backend.auth.dtos.TokenResponse;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;

public interface UserAuthService {
    void register(UserRegisterDto userDto);
    TokenResponse login(UserLoginDto dto);

}

package com.indoreathleteacademy.backend.auth.services;

import com.indoreathleteacademy.backend.auth.dtos.UserDto;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;

public interface UserAuthService {
    void register(UserRegisterDto userDto);
}

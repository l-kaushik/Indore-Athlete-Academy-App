package com.indoreathleteacademy.backend.auth.services.impl;

import com.indoreathleteacademy.backend.auth.dtos.UserDto;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.services.UserAuthService;
import com.indoreathleteacademy.backend.auth.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserAuthServiceImpl implements UserAuthService {

    private final UserService userService;

    @Override
    public void register(UserRegisterDto dto) {
        userService.createUser(dto);
    }
}

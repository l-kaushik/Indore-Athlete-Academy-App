package com.indoreathleteacademy.backend.auth.services;

import com.indoreathleteacademy.backend.auth.dtos.UserDto;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;

public interface UserService {
    void createUser(UserRegisterDto userDto);
    UserDto getUserByEmailId(String emailId);
    UserDto getUserByUsername(String username);
    UserDto getUserById(String userId);
    void deleteUser(String userId);
}

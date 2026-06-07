package com.indoreathleteacademy.backend.auth.services;

import com.indoreathleteacademy.backend.auth.dtos.UserDto;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.entities.Role;

import java.util.UUID;

public interface UserService {
    void createUser(UserRegisterDto userDto);
    UserDto getUserByEmailId(String emailId);
    UserDto getUserByUsername(String username);
    UserDto getUserById(String userId);
    boolean existsByUsername(String username);
    void deleteUser(String userId);

    UserDto updateUserRole(UUID id, Role role);
}

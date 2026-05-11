package com.indoreathleteacademy.backend.auth.services.impl;

import com.indoreathleteacademy.backend.auth.dtos.UserDto;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.entities.Provider;
import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.auth.repositories.UserRepository;
import com.indoreathleteacademy.backend.auth.services.UserService;
import com.indoreathleteacademy.backend.auth.utils.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserAuthRepository userAuthRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void createUser(UserRegisterDto dto) {
        log.info("Attempting to create user account for username: {}, email: {}", dto.username(), dto.email());

        if(dto.email() == null || dto.email().isBlank())
            throw new IllegalArgumentException("Email is required");

        // TODO: add separate endpoint for username lookup
        if(dto.username() != null && userAuthRepository.existsByUsername(dto.username()))
            throw new IllegalArgumentException("Username is already registered");

        if(userAuthRepository.existsByEmailId(dto.email())) {
            throw new IllegalArgumentException("User with given email is already exists");
        }

        UserAuth auth = UserMapper.toUserAuth(dto);
        auth.setProvider(Provider.LOCAL);
        auth.setLocked(false);
        auth.setEnabled(true);
        auth.setPasswordHash(passwordEncoder.encode(dto.password()));
        userAuthRepository.save(auth);
    }

    // TODO: implement email verification service

    @Override
    public UserDto getUserByEmailId(String emailId) {
        if(emailId == null || emailId.isBlank())
            throw new IllegalArgumentException("Invalid email id provided");

        UserAuth found = userAuthRepository.findByEmailId(emailId).orElseThrow(
                () -> new IllegalArgumentException("Account not found!!")
        );

        return UserMapper.toDto(found);
    }

    @Override
    public UserDto getUserByUsername(String username) {
        if(username == null || username.isBlank())
            throw new IllegalArgumentException("Invalid username provided!!");

        UserAuth found = userAuthRepository.findByUsername(username).orElseThrow(
                () -> new IllegalArgumentException("Account not found!!")
        );

        return UserMapper.toDto(found);
    }

    @Override
    public UserDto getUserById(String userId) {
        if(userId == null || userId.isBlank())
            throw new IllegalArgumentException("Invalid user id provided!!");

        UserAuth found = userAuthRepository.findById(UUID.fromString(userId)).orElseThrow(
                () -> new IllegalArgumentException("Account not found!!")
        );

        return UserMapper.toDto(found);
    }

    @Override
    public void deleteUser(String userId) {

    }
}

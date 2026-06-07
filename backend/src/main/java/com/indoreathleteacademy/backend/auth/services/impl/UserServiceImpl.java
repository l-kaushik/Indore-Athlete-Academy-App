package com.indoreathleteacademy.backend.auth.services.impl;

import com.indoreathleteacademy.backend.auth.dtos.UserDto;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.entities.Provider;
import com.indoreathleteacademy.backend.auth.entities.Role;
import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.auth.repositories.UserRepository;
import com.indoreathleteacademy.backend.auth.services.UserService;
import com.indoreathleteacademy.backend.auth.utils.UserMapper;
import com.indoreathleteacademy.backend.core.utils.CoreUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserAuthRepository userAuthRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public void createUser(UserRegisterDto dto) {
        log.info("Attempting user registration");

        if(dto.email() == null || dto.email().isBlank())
            throw new IllegalArgumentException("Email is required");

        String username = (dto.username() == null || dto.username().isBlank()) ? dto.email() : dto.username();

        // TODO: add filter to prevent censored usernames
        verifyUsername(username);

        if(userAuthRepository.existsByUsername(username))
            throw new IllegalArgumentException("Username is already registered");

        if(userAuthRepository.existsByEmailId(dto.email())) {
            throw new IllegalArgumentException("User with given email is already exists");
        }

        UserAuth auth = UserMapper.toUserAuth(dto);
        auth.setProvider(Provider.LOCAL);
        auth.setRoles(Set.of(Role.STUDENT));
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

        try{
            verifyUsername(username);
        } catch (IllegalArgumentException e) {
            throw new EntityNotFoundException("Account not found!!");
        }

        UserAuth found = userAuthRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("Account not found!!")
        );

        return UserMapper.toDto(found);
    }

    @Override
    public UserDto getUserById(String userId) {
        if(userId == null || userId.isBlank())
            throw new IllegalArgumentException("Invalid user id provided!!");

        UserAuth found = userAuthRepository.findById(UUID.fromString(userId)).orElseThrow(
                () -> new EntityNotFoundException("Account not found!!")
        );

        return UserMapper.toDto(found);
    }

    // TODO: add rate limiting for this api to prevent multiple calls
    @Override
    public boolean existsByUsername(String username) {
        return userAuthRepository.existsByUsername(username);
    }

    @Override
    public void deleteUser(String userId) {

    }

    @Override
    public UserDto updateUserRole(UUID id, Role role) {
        UserAuth user = userAuthRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("User not found !!")
        );

        var roles = user.getRoles();

        if(roles.contains(role)){
            return UserMapper.toDto(user);
        }

        user.getRoles().add(role);
        return UserMapper.toDto(userAuthRepository.save(user));
    }

    private void verifyUsername(String username) {
        if(CoreUtils.RESERVED.contains(username.toLowerCase(Locale.ROOT))) {
            throw new IllegalArgumentException("Username is reserved");
        }
    }
}

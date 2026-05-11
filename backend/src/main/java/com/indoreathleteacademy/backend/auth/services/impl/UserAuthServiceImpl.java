package com.indoreathleteacademy.backend.auth.services.impl;

import com.indoreathleteacademy.backend.auth.dtos.UserLoginDto;
import com.indoreathleteacademy.backend.auth.dtos.UserLoginResponseDto;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.auth.services.UserAuthService;
import com.indoreathleteacademy.backend.auth.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserAuthServiceImpl implements UserAuthService {

    private final UserService userService;
    private final UserAuthRepository authRepository;
    private final AuthenticationManager authenticationManager;

    @Override
    public void register(UserRegisterDto dto) {
        userService.createUser(dto);
    }

    @Override
    public UserLoginResponseDto login(UserLoginDto dto) {
        log.info("Authentication attempt for user {}", dto.username());
        Authentication authenticated = authenticate(dto);
        UserAuth userAuth = (UserAuth) authenticated.getPrincipal();
        return new UserLoginResponseDto(userAuth.getUsername());
    }

    private Authentication authenticate(UserLoginDto dto) {
         try{
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.username(), dto.password()));
        } catch (BadCredentialsException e) {
             log.warn("Invalid credentials for user {}", dto.username());
            throw new BadCredentialsException("Invalid username or password");
        } catch (DisabledException e) {
             log.warn("Disabled account login attempt for user {}", dto.username());
             throw new DisabledException("User account is disabled!!");
        }catch (Exception e) {
             log.error("Unexpected authentication error for user {}", dto.username(), e);
             throw e;
        }
    }
}

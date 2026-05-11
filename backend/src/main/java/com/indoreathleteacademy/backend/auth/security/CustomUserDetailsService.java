package com.indoreathleteacademy.backend.auth.security;

import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserAuthRepository repository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {

        if(identifier.contains("@")) {
            return repository.findByEmailId(identifier).orElseThrow(
                    () -> new UsernameNotFoundException("Invalid credentials provided!!")
            );
        }

        return repository.findByUsername(identifier).orElseThrow(
                () -> new UsernameNotFoundException("Invalid credentials provided!!")
        );
    }
}

package com.indoreathleteacademy.backend.auth.security;

import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

// class for handling pre-authorize checks for login

@Component
public class UserSecurity {

    public boolean isSameUser(String requestedUserId, Authentication authentication) {
        UserAuth userAuth = (UserAuth) authentication.getPrincipal();
        return userAuth.getId().toString().equals(requestedUserId);
    }
}

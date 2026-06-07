package com.indoreathleteacademy.backend.core.utils;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.impl.TimeBasedEpochGenerator;
import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Set;
import java.util.UUID;

public class CoreUtils {
    @Autowired
    private static final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    public static final Set<String> RESERVED = Set.of(
            "admin",
            "administrator",
            "root",
            "system",
            "support"
    );

    private static final TimeBasedEpochGenerator UUID_V7_GENERATOR = Generators.timeBasedEpochGenerator();

    public static UUID generateUuidV7() {
        return UUID_V7_GENERATOR.generate();
    }

    public static UserAuth getCurrentUser() {
        if(authentication != null && authentication.getPrincipal() instanceof UserDetails user) {
            return (UserAuth) user;
        }
        throw new IllegalStateException("Authenticated principal is not of type UserAuth");
    }
}

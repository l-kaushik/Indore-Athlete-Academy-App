package com.indoreathleteacademy.backend.auth.repositories;

import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserAuthRepository extends JpaRepository<UserAuth, UUID> {
    Optional<UserAuth> findByEmailId(String emailId);
    Optional<UserAuth> findByUsername(String username);
    Optional<UserAuth> findByUsernameOrEmailId(String username, String emailId);
    boolean existsByEmailId(String emailId);
    boolean existsByUsername(String username);
}

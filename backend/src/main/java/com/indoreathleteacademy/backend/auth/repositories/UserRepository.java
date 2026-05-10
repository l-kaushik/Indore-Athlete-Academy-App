package com.indoreathleteacademy.backend.auth.repositories;

import com.indoreathleteacademy.backend.auth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}

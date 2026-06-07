package com.indoreathleteacademy.backend.auth.bootstrap;

import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.entities.Provider;
import com.indoreathleteacademy.backend.auth.entities.Role;
import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.auth.utils.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Slf4j
@Component
public class AdminSeeder implements CommandLineRunner {

    private final String adminEmail;
    private final String adminPassword;
    private final UserAuthRepository repository;
    private final PasswordEncoder passwordEncoder;


    public AdminSeeder(
            @Value("${app.bootstrap-admin.email}") String adminEmail,
            @Value("${app.bootstrap-admin.password}") String adminPassword,
            UserAuthRepository repository, PasswordEncoder passwordEncoder) {
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    private void createAdminAccount() {

        if(repository.existsByUsername(adminEmail)) {
            log.info("Skipping admin seeding, account already present.");
            return;
        }

        UserRegisterDto dto = new UserRegisterDto(adminEmail, adminEmail, adminPassword, "NA", null, null);
        UserAuth auth = UserMapper.toUserAuth(dto);
        auth.setProvider(Provider.LOCAL);
        auth.setRoles(Set.of(Role.ADMIN));
        auth.setPasswordHash(passwordEncoder.encode(dto.password()));
        repository.save(auth);
        log.info("Seeded admin account");
    }

    @Override
    public void run(String... args) throws Exception {
        createAdminAccount();
    }
}

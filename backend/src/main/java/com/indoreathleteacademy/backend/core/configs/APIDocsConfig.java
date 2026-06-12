package com.indoreathleteacademy.backend.core.configs;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Indore Athlete Academy Backend",
                description = "REST API for managing athletes, trainers, workouts, assignments, and fitness tracking.",
                contact = @Contact(
                        name = "Lokesh Kaushik",
                        email = "contact.lokeshkaushik@gmail.com"
                ),
                version = "1.0"
        ),
        security = {
                @SecurityRequirement(
                        name="bearerAuth"
                )
        }
)

@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer", // Authorization: Bearer token
        bearerFormat = "JWT"
)
public class APIDocsConfig {
}

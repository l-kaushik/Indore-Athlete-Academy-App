package com.indoreathleteacademy.backend.auth.entities;

import jakarta.persistence.Embeddable;

@Embeddable
public record Address(
        String street,
        String city,
        String state,
        String pincode){
}

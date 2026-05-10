package com.indoreathleteacademy.backend.auth.entities;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {
    String street;
    String city;
    String state;
    String pincode;
}

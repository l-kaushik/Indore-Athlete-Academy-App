package com.indoreathleteacademy.backend.core.utils;

import net.datafaker.Faker;

public class FakerUtils {
    private static final Faker faker = new Faker();
    private FakerUtils() {}

    public static String generateName() {
        return faker.funnyName().name();
    }

    public static String generatePrefixedName(String prefix) {
        return prefix + " " + generateName() + " " + generateRandomString();
    }

    private static String generateRandomString() {
        return faker.regexify("[A-Za-z0-9]{4,6}");
    }
}

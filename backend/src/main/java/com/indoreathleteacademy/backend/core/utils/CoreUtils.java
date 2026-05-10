package com.indoreathleteacademy.backend.core.utils;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.impl.TimeBasedEpochGenerator;

import java.util.UUID;

public class CoreUtils {

    private static final TimeBasedEpochGenerator UUID_V7_GENERATOR = Generators.timeBasedEpochGenerator();

    public static UUID generateUuidV7() {
        return UUID_V7_GENERATOR.generate();
    }
}

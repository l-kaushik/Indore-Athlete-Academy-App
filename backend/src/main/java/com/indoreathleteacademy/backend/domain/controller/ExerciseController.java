package com.indoreathleteacademy.backend.domain.controller;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseSeedDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.services.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/exercises")
public class ExerciseController {

    private final ExerciseService service;

//    ---------------------------------------------- COMMON ENDPOINTS ------------------------------------------------
    // get list of exercises based on filter
    @GetMapping
    public ResponseEntity<Page<ExerciseSeedDto>> getFilteredExercises(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) ExerciseType type,
            @RequestParam(name = "muscle-group", required = false) MuscleGroup muscleGroup,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
            ){
        return ResponseEntity.ok(service.getFilteredExercises(name, type, muscleGroup, page, size));
    }
}

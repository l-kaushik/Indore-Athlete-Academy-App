package com.indoreathleteacademy.backend.domain.controller;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseLogCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.ExerciseLogDto;
import com.indoreathleteacademy.backend.domain.services.ExerciseLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/{workoutId}/exercise-logs")
@RequiredArgsConstructor
public class ExerciseLogController {

    private final ExerciseLogService service;

    @PostMapping("/")
    ResponseEntity<ExerciseLogDto> createExerciseLog(@PathVariable UUID workoutId, @RequestBody ExerciseLogCreationDto dto) {
        return ResponseEntity.ok(service.createExerciseLog(workoutId, dto));
    }

    @GetMapping("/")
    ResponseEntity<Page<ExerciseLogDto>> getExerciseLog(
            @PathVariable UUID workoutId,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getExerciseLog(workoutId, page, size));
    }

}

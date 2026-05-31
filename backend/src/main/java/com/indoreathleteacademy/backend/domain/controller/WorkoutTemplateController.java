package com.indoreathleteacademy.backend.domain.controller;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.services.impl.WorkoutTemplateServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/workout-templates")
public class WorkoutTemplateController {

    private final WorkoutTemplateServiceImpl service;

    // create template  api/v1/workout-templates
    @PostMapping
    public ResponseEntity<WorkoutTemplateDto> createTemplate(@RequestBody WorkoutTemplateCreationDto dto) {
        return ResponseEntity.ok(service.createTemplate(dto));
    }

    // get single template based on id
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutTemplateDto> getTemplateById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getTemplateById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutTemplateDto> updateTemplate(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(service.updateTemplate(id, body));
    }


    @PostMapping("/{id}/exercises")
    public ResponseEntity<ExerciseDto> createExercise(@PathVariable("id") UUID templateId, @RequestBody Map<String, UUID> body) {
        return ResponseEntity.ok(service.createExercise(templateId, body.get("exerciseId")));
    }

    @GetMapping("/{id}/exercises")
    public ResponseEntity<Page<ExerciseDto>> getExercises(@PathVariable("id") UUID templateId,
                                          @RequestParam(required = false) String name,
                                          @RequestParam(required = false) ExerciseType type,
                                          @RequestParam(name = "muscle-group", required = false) MuscleGroup muscleGroup,
                                          @RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size
                                        ){
        return ResponseEntity.ok(service.getExercises(templateId, name, type, muscleGroup, page, size));
    }

// TODO: add endpoint for updating (adding more exercise or changing position of exercises)

}

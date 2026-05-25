package com.indoreathleteacademy.backend.domain.controller;

import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.services.impl.WorkoutTemplateServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

}

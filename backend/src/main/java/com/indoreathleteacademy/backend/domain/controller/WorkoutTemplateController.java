package com.indoreathleteacademy.backend.domain.controller;

import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.services.impl.WorkoutTemplateServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/workout-templates")
public class WorkoutTemplateController {

    private final WorkoutTemplateServiceImpl service;

    @PostMapping
    public ResponseEntity<WorkoutTemplateDto> createTemplate(@RequestBody WorkoutTemplateCreationDto dto) {
        return ResponseEntity.ok(service.createTemplate(dto));
    }
}

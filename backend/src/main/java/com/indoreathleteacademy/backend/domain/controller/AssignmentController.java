package com.indoreathleteacademy.backend.domain.controller;

import com.indoreathleteacademy.backend.domain.dtos.AssignmentCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;
import com.indoreathleteacademy.backend.domain.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/workout-assignments")
public class AssignmentController {
    private final AssignmentService service;

    @PostMapping
    public ResponseEntity<AssignmentDto> createAssignment(@RequestBody AssignmentCreationDto dto) {
        return ResponseEntity.ok(service.createAssignment(dto));
    }


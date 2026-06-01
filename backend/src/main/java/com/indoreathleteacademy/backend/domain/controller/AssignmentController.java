package com.indoreathleteacademy.backend.domain.controller;

import com.indoreathleteacademy.backend.domain.dtos.AssignmentCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentExerciseCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentExerciseDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.entities.workout.AssignmentStatus;
import com.indoreathleteacademy.backend.domain.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

    @GetMapping("/{id}")
    public ResponseEntity<AssignmentDto> getAssignmentById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(service.getAssignmentById(id));
    }


    @PostMapping("/{id}/exercises")
    public ResponseEntity<AssignmentExerciseDto> createExercise(@PathVariable("id") UUID assignmentId , @RequestBody AssignmentExerciseCreationDto dto) {
        return ResponseEntity.ok(service.createExercise(assignmentId, dto));
    }

    @GetMapping("/{id}/exercises")
    public ResponseEntity<Page<AssignmentExerciseDto>> getExercises(@PathVariable("id") UUID assignmentId,
                                                          @RequestParam(required = false) String name,
                                                          @RequestParam(required = false) ExerciseType type,
                                                          @RequestParam(name = "muscle-group", required = false) MuscleGroup muscleGroup,
                                                          @RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "10") int size
    ){
        return ResponseEntity.ok(service.getExercises(assignmentId, name, type, muscleGroup, page, size));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AssignmentDto> updateStatus(@PathVariable("id") UUID id, @RequestParam AssignmentStatus status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

}

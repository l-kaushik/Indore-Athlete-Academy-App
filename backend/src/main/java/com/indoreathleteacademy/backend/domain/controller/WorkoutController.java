package com.indoreathleteacademy.backend.domain.controller;

import com.indoreathleteacademy.backend.domain.dtos.WorkoutDto;
import com.indoreathleteacademy.backend.domain.services.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/workouts")
public class WorkoutController {
    private final WorkoutService service;

//    ---------------------------------------------- COMMON ENDPOINTS ------------------------------------------------
// get workout history
//  POST /api/v1/workouts/start
//  POST /api/v1/workouts/finish
// get workout details based on id
//
    @PostMapping("/")
    public ResponseEntity<WorkoutDto> createWorkout(@RequestBody Map<String, UUID> body) {
        return  ResponseEntity.ok(service.createWorkout(body.get("assignmentId")));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutDto> getById(@PathVariable("id") UUID id){
        return  ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/recents")
    public ResponseEntity<Page<WorkoutDto>> getRecentWorkouts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        return  ResponseEntity.ok(service.getRecentWorkouts(page, size));
    }

    @PutMapping("/{id}/start")
    public ResponseEntity<WorkoutDto> setStartTime(@PathVariable("id") UUID id) throws BadRequestException{
        return ResponseEntity.ok(service.setStartTime(id));
    }

    @PutMapping("/{id}/end")
    public ResponseEntity<WorkoutDto> setEndTime(@PathVariable("id") UUID id) throws BadRequestException {
        return ResponseEntity.ok(service.setEndTime(id));
    }
}

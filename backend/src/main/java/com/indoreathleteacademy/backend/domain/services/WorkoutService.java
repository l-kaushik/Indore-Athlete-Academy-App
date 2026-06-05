package com.indoreathleteacademy.backend.domain.services;

import com.indoreathleteacademy.backend.domain.dtos.WorkoutDto;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface WorkoutService {
    WorkoutDto createWorkout(UUID assignmentId);
    WorkoutDto getById(UUID id);
    Page<WorkoutDto> getRecentWorkouts(int page, int size);
// add filter based on user role and student & trainer Id,
//    filter for date as well


    WorkoutDto setStartTime(UUID id) throws BadRequestException;
    WorkoutDto setEndTime(UUID id) throws BadRequestException;
}

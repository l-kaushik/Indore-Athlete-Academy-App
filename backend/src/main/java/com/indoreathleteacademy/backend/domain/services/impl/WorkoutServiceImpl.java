package com.indoreathleteacademy.backend.domain.services.impl;

import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.core.utils.CoreUtils;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutDto;
import com.indoreathleteacademy.backend.domain.entities.workout.Workout;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignment;
import com.indoreathleteacademy.backend.domain.mapper.WorkoutMapper;
import com.indoreathleteacademy.backend.domain.repositories.AssignmentRepository;
import com.indoreathleteacademy.backend.domain.repositories.WorkoutRepository;
import com.indoreathleteacademy.backend.domain.services.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {
    private final WorkoutRepository repository;
    private final AssignmentRepository assignmentRepository;
    private final WorkoutMapper mapper;
    private final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    @Override
    public WorkoutDto createWorkout(UUID assignmentId){
        WorkoutAssignment assignment = assignmentRepository.findById(assignmentId).orElseThrow(
                () -> new IllegalArgumentException("Workout assignment not found!!")
        );

        Workout workout = Workout.builder().assignment(assignment).build();
        return mapper.toDto(repository.save(workout));
    }

    @Override
    public WorkoutDto getById(UUID id) {
        Workout result = repository.findById(id).orElseThrow(
                () -> new IllegalStateException("Workout not found!!")
        );
        return mapper.toDto(result);
    }

    @Override
    public Page<WorkoutDto> getRecentWorkouts(int page, int size) {
        UserAuth userAuth = CoreUtils.getCurrentUser();
//        if(userAuth.getRoles().contains(Role.TRAINER))
        return null;
    }

    @Override
    public WorkoutDto setStartTime(UUID id) throws BadRequestException{
        Workout workout = repository.findById(id).orElseThrow(
                () -> new IllegalStateException("Workout not found!!")
        );

        if(workout.getEndTime() != null){
            throw new BadRequestException("Workout already ended");
        }

        if(workout.getStartTime() != null) {
            throw new BadRequestException("Workout already started");
        }

        workout.setStartTime(Instant.now());

        return mapper.toDto(repository.save(workout));
    }

    @Override
    public WorkoutDto setEndTime(UUID id) throws BadRequestException {
        Workout workout = repository.findById(id).orElseThrow(
                () -> new IllegalStateException("Workout not found!!")
        );

        if(workout.getEndTime() != null){
            throw new BadRequestException("Workout already ended");
        }

        if(workout.getStartTime() == null) {
            throw new BadRequestException("Workout not started yet");
        }

        workout.setEndTime(Instant.now());

        return mapper.toDto(repository.save(workout));
    }
}

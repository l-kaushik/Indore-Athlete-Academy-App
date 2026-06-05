package com.indoreathleteacademy.backend.domain.mapper;

import com.indoreathleteacademy.backend.core.Mapper.BaseMapper;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutDto;
import com.indoreathleteacademy.backend.domain.entities.workout.Workout;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutMapper extends BaseMapper<Workout, WorkoutDto> {

    @Mapping(target = "assignmentId", source = "assignment.id")
    @Mapping(target = "start", source = "startTime")
    @Mapping(target = "end", source = "endTime")
    WorkoutDto toDto(Workout workout);
}

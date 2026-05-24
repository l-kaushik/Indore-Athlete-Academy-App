package com.indoreathleteacademy.backend.domain.mapper;

import com.indoreathleteacademy.backend.core.Mapper.BaseMapper;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplate;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.UUID;

@Mapper(componentModel = "spring")
public interface WorkoutTemplateMapper extends BaseMapper<WorkoutTemplate, WorkoutTemplateDto> {

    @Mapping(target = "trainerId", source = "trainer.id")
    WorkoutTemplateDto toDto(WorkoutTemplate entity);
}

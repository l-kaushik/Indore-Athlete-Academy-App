package com.indoreathleteacademy.backend.domain.mapper;

import com.indoreathleteacademy.backend.core.Mapper.BaseMapper;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplate;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutTemplateMapper extends BaseMapper<WorkoutTemplate, WorkoutTemplateDto> {

    @Mapping(target = "trainerId", source = "entity.trainer.id")
    @Mapping(target = "exerciseCount", source = "count")
    WorkoutTemplateDto toDto(WorkoutTemplate entity, long count);
}

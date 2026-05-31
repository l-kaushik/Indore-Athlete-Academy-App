package com.indoreathleteacademy.backend.domain.mapper;

import com.indoreathleteacademy.backend.core.Mapper.BaseMapper;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AssignmentMapper extends BaseMapper<WorkoutAssignment, AssignmentDto> {
    @Mapping(target = "studentId", source = "student.id")
    @Mapping(target = "trainerId", source = "trainer.id")
    @Mapping(target = "templateId", source = "template.id")
    AssignmentDto toDto(WorkoutAssignment entity);
}

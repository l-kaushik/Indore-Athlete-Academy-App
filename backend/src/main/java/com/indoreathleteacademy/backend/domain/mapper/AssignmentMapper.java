package com.indoreathleteacademy.backend.domain.mapper;

import com.indoreathleteacademy.backend.core.Mapper.BaseMapper;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentDto;
import com.indoreathleteacademy.backend.domain.dtos.AssignmentExerciseDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignment;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutAssignmentExercise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AssignmentMapper extends BaseMapper<WorkoutAssignment, AssignmentDto> {
    @Mapping(target = "studentId", source = "student.id")
    @Mapping(target = "trainerId", source = "trainer.id")
    @Mapping(target = "templateId", source = "template.id")
    AssignmentDto toDto(WorkoutAssignment entity);

    @Mapping(target = "assignmentId", source = "assignment.id")
    @Mapping(target = "exerciseId", source = "exercise.id")
    @Mapping(target = "exerciseName", source = "exerciseNameSnapshot")
    @Mapping(target = "exerciseType", source = "exerciseTypeSnapshot")
    @Mapping(target = "defaultUnit", source = "defaultUnitSnapshot")
    AssignmentExerciseDto toDto(WorkoutAssignmentExercise entity);
}

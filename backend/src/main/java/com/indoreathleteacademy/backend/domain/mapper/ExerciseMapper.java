package com.indoreathleteacademy.backend.domain.mapper;

import com.indoreathleteacademy.backend.core.Mapper.BaseMapper;
import com.indoreathleteacademy.backend.domain.dtos.ExerciseSeedDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseMaster;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExerciseMapper extends BaseMapper<ExerciseMaster, ExerciseSeedDto> {
}

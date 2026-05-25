package com.indoreathleteacademy.backend.domain.services;

import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;

public interface WorkoutTemplateService {
    WorkoutTemplateDto createTemplate(WorkoutTemplateCreationDto dto);

}

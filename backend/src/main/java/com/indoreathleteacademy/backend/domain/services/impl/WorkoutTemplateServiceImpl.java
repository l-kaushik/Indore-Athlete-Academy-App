package com.indoreathleteacademy.backend.domain.services.impl;

import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.core.utils.FakerUtils;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplate;
import com.indoreathleteacademy.backend.domain.mapper.WorkoutTemplateMapper;
import com.indoreathleteacademy.backend.domain.repositories.WorkoutTemplateRepository;
import com.indoreathleteacademy.backend.domain.services.WorkoutTemplateService;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkoutTemplateServiceImpl implements WorkoutTemplateService {

    private final WorkoutTemplateRepository repository;
    private final UserAuthRepository authRepository;
    private final WorkoutTemplateMapper mapper;

    public @Nullable WorkoutTemplateDto createTemplate(WorkoutTemplateDto dto) {
        // TODO: add validation

        String name = dto.name();
        UUID trainerId = dto.trainerId();

        UserAuth trainer = authRepository.findById(trainerId).orElseThrow(() ->
                new IllegalArgumentException("Trainer not found!!")
        );

        if(name.isBlank()) name = FakerUtils.generatePrefixedName("Template");

        WorkoutTemplate workoutTemplate = WorkoutTemplate.builder()
                .name(name)
                .description(dto.description())
                .trainer(trainer)
                .build();

        return mapper.toDto(repository.save(workoutTemplate));
    }
}

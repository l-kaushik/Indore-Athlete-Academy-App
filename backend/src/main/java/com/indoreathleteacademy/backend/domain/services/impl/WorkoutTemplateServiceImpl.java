package com.indoreathleteacademy.backend.domain.services.impl;

import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.core.utils.FakerUtils;
import com.indoreathleteacademy.backend.domain.dtos.ExerciseDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplate;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplateExercise;
import com.indoreathleteacademy.backend.domain.mapper.ExerciseMapper;
import com.indoreathleteacademy.backend.domain.mapper.WorkoutTemplateMapper;
import com.indoreathleteacademy.backend.domain.repositories.ExerciseMasterRepository;
import com.indoreathleteacademy.backend.domain.repositories.WorkoutTemplateExerciseRepository;
import com.indoreathleteacademy.backend.domain.repositories.WorkoutTemplateRepository;
import com.indoreathleteacademy.backend.domain.services.WorkoutTemplateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkoutTemplateServiceImpl implements WorkoutTemplateService {

    private final WorkoutTemplateRepository repository;
    private final UserAuthRepository authRepository;
    private final WorkoutTemplateExerciseRepository templateExerciseRepository;
    private final ExerciseMasterRepository exerciseRepository;
    private final WorkoutTemplateMapper mapper;
    private final ExerciseMapper exerciseMapper;

    public @Nullable WorkoutTemplateDto createTemplate(WorkoutTemplateCreationDto dto) {
        // TODO: add validation
        log.info("Workout template creation initiated...");

        String name = dto.name();
        UUID trainerId = dto.trainerId();

        // TODO: test with getReferenceById and invalid UUID
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

    @Override
    public WorkoutTemplateDto getTemplateById(UUID id) {
        return repository.findByIdWithExerciseCount(id).orElseThrow(() ->
                new IllegalArgumentException("Template not found!!"));
    }

    @Override
    public ExerciseDto createExercise(UUID templateId, UUID exerciseId) {
        log.info("Adding exercise reference for template");

        int orderIndex = templateExerciseRepository.findMaxOrderIndexByTemplateId(templateId);
        var template = repository.findById(templateId).orElseThrow(() ->
                new IllegalArgumentException("Template not found"));
        var exercise = exerciseRepository.findById(exerciseId).orElseThrow(() ->
                new IllegalArgumentException("Exercise not found"));

        WorkoutTemplateExercise templateExercise = WorkoutTemplateExercise.builder()
                .template(template)
                .exerciseMaster(exercise)
                .orderIndex(++orderIndex)
                .build();

        var saved = templateExerciseRepository.save(templateExercise);

        return exerciseMapper.toDto(saved.getExerciseMaster());
    }
}

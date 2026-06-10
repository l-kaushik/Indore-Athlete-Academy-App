package com.indoreathleteacademy.backend.domain.services.impl;

import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.auth.repositories.UserAuthRepository;
import com.indoreathleteacademy.backend.core.utils.FakerUtils;
import com.indoreathleteacademy.backend.domain.dtos.ExerciseDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateCreationDto;
import com.indoreathleteacademy.backend.domain.dtos.WorkoutTemplateDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseType;
import com.indoreathleteacademy.backend.domain.entities.exercise.MuscleGroup;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplate;
import com.indoreathleteacademy.backend.domain.entities.workout.WorkoutTemplateExercise;
import com.indoreathleteacademy.backend.domain.mapper.ExerciseMapper;
import com.indoreathleteacademy.backend.domain.mapper.WorkoutTemplateMapper;
import com.indoreathleteacademy.backend.domain.repositories.ExerciseMasterRepository;
import com.indoreathleteacademy.backend.domain.repositories.WorkoutTemplateExerciseRepository;
import com.indoreathleteacademy.backend.domain.repositories.WorkoutTemplateRepository;
import com.indoreathleteacademy.backend.domain.services.WorkoutTemplateService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

    @Transactional
    public @Nullable WorkoutTemplateDto createTemplate(WorkoutTemplateCreationDto dto) {
        // TODO: add validation
        log.info("Workout template creation initiated...");

        String name = dto.name();
        UUID trainerId = dto.trainerId();

        UserAuth trainer = authRepository.getReferenceById(trainerId);

        if(name.isBlank()) name = FakerUtils.generatePrefixedName("Template");

        WorkoutTemplate workoutTemplate = WorkoutTemplate.builder()
                .name(name)
                .description(dto.description())
                .trainer(trainer)
                .build();

        var saved = repository.save(workoutTemplate);
        long count = createExercise(saved, dto.exercises());
        return mapper.toDto(saved, count);
    }

    @Override
    public WorkoutTemplateDto getTemplateById(UUID id) {
        return repository.findByIdWithExerciseCount(id).orElseThrow(() ->
                new IllegalArgumentException("Template not found!!"));
    }

    @Override
    public WorkoutTemplateDto updateTemplate(UUID id, Map<String, String> body) {
        String name = body.get("name");
        String description = body.get("description");

        WorkoutTemplate template = repository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Workout template not found")
        );

        if(!name.isBlank()) template.setName(name);
        if(!description.isBlank()) template.setDescription(description);

        return mapper.toDto(repository.save(template));
    }

    @Override
    private long createExercise(WorkoutTemplate template, List<UUID> exercises) {
        log.info("Adding exercise reference for template");

        List<WorkoutTemplateExercise> exerciseMasterList = new ArrayList<>();
        int orderIndex = 0;

        for(var exerciseId : exercises) {

            var exercise = exerciseRepository.findById(exerciseId).orElseThrow(() ->
                    new IllegalArgumentException("Exercise not found"));

            WorkoutTemplateExercise templateExercise = WorkoutTemplateExercise.builder()
                    .template(template)
                    .exerciseMaster(exercise)
                    .orderIndex(++orderIndex)
                    .build();

            exerciseMasterList.add(templateExercise);
        }
        return templateExerciseRepository.saveAll(exerciseMasterList).size();
    }

    @Override
    public Page<ExerciseDto> getExercises(UUID templateId, String name, ExerciseType type, MuscleGroup muscleGroup, int page, int size) {
       log.info("Fetching exercises for a workout template request");
        Pageable pageable = PageRequest.of(page, size);
        String normalizedName = name != null ? name.toLowerCase() : null;
        return templateExerciseRepository.findByTemplateId(templateId, normalizedName, type, muscleGroup, pageable);
    }

    @Override
    public void removeExercise(UUID templateId, UUID exerciseId) {

    }
}

package com.indoreathleteacademy.backend.domain.bootstrap;

import com.indoreathleteacademy.backend.domain.dtos.ExerciseSeedDto;
import com.indoreathleteacademy.backend.domain.entities.exercise.ExerciseMaster;
import com.indoreathleteacademy.backend.domain.repositories.ExerciseMasterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExerciseMasterSeeder implements CommandLineRunner {

    private final ExerciseMasterRepository repository;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        seedData();
    }

    @Transactional
    private void seedData() throws IOException {
        Resource resource =
                new ClassPathResource("seed/exercises.json");

        InputStream inputStream = resource.getInputStream();

        List<ExerciseSeedDto> seedData = objectMapper.readValue(inputStream, new TypeReference<List<ExerciseSeedDto>>() {});

        List<ExerciseMaster> entities = new ArrayList<>();

        for (ExerciseSeedDto dto : seedData) {

            if (repository.existsByName(dto.name())) {
                continue;
            }

            ExerciseMaster exercise = ExerciseMaster.builder()
                    .name(dto.name())
                    .type(dto.type())
                    .defaultUnit(dto.defaultUnit())
                    .muscleGroup(dto.muscleGroup())
                    .equipmentNeeded(dto.equipmentNeeded())
                    .description(dto.description())
                    .build();

            entities.add(exercise);
        }

        repository.saveAll(entities);
        log.info("Seeded data for ExerciseMaster");
    }
}

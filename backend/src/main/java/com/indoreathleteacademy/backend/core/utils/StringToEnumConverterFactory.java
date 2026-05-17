package com.indoreathleteacademy.backend.core.utils;

import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;
import org.springframework.stereotype.Component;

@Component
@SuppressWarnings({"unchecked"})
public class StringToEnumConverterFactory implements ConverterFactory<String, Enum> {

    @Override
    public <T extends Enum> Converter<String, T> getConverter(Class<T> targetType) {

        return source -> {
            if (source.isBlank()) { return null; }
            try {
                return (T) Enum.valueOf(targetType, source.trim().toUpperCase());
            } catch (IllegalArgumentException e) {

                throw new IllegalArgumentException(
                        "Invalid value '" + source + "' for enum " + targetType.getSimpleName()
                );
            }
        };
    }
}

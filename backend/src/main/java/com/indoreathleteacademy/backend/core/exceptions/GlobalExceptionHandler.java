package com.indoreathleteacademy.backend.core.exceptions;

import com.indoreathleteacademy.backend.core.dto.ApiError;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.exc.InvalidFormatException;

import java.util.Arrays;
import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            UsernameNotFoundException.class,
            BadCredentialsException.class,
            CredentialsExpiredException.class
    })
    public ResponseEntity<ApiError> handleUnauthorized(Exception e, HttpServletRequest request ) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, e, request);
    }

    @ExceptionHandler({
            DisabledException.class,
            LockedException.class
    })
    public ResponseEntity<ApiError> handleDisabled(Exception e, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, e, request);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgument(IllegalArgumentException e, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, e, request);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiError> handleEntity(EntityNotFoundException e, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, e, request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException(MethodArgumentNotValidException e, HttpServletRequest request) {
        String message = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error ->
                        error.getField() + ": " + error.getDefaultMessage()
                )
                .findFirst()
                .orElse("Validation failed");

        var apiError = ApiError.of(
                HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_GATEWAY.getReasonPhrase(),
                message, request.getRequestURI()
        );
        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException e, HttpServletRequest request) {

        String message = "Invalid request payload";
        Throwable cause = e.getCause();

        if (cause instanceof InvalidFormatException ife) {

            String fieldName = ife.getPath().stream()
                    .map(JacksonException.Reference::getPropertyName)
                    .findFirst()
                    .orElse("field");

            Class<?> targetType = ife.getTargetType();

            if (targetType == UUID.class) {
                message = fieldName + " must be a valid UUID";
            } else {
                message = fieldName + " has invalid value";
            }
        }

        ApiError error = ApiError.of(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.getReasonPhrase(),
                message, request.getRequestURI());
        return ResponseEntity.badRequest().body(error);
    }

    private ResponseEntity<ApiError> buildErrorResponse(HttpStatus status, Exception e,  HttpServletRequest request) {
        var apiError = ApiError.of(status.value(), status.getReasonPhrase(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(apiError);
    }

    // Exceptions from domain package
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> handleTypeMismatch(MethodArgumentTypeMismatchException e, HttpServletRequest request) {

        String message = "Invalid request parameter";

        if (e.getRequiredType() != null && e.getRequiredType().isEnum()) {
            Object[] allowedValues = e.getRequiredType().getEnumConstants();
            message = String.format(
                    "Invalid value '%s' for '%s'. Allowed values: %s",
                    e.getValue(), e.getName(), Arrays.toString(allowedValues)
            );
        }

        var apiError = ApiError.of(
                HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.getReasonPhrase(),
                message, request.getRequestURI());
        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiError> handleDataIntegrityViolation(DataIntegrityViolationException ex, HttpServletRequest request) {

        HttpStatus status = HttpStatus.CONFLICT;
        String message = "The operation could not be completed because it violates a data integrity constraint.";
        String rootMessage = ex.getMostSpecificCause().getMessage();

        if (rootMessage != null && rootMessage.contains("violates foreign key constraint")) {
            message = "One or more referenced resources do not exist.";
        }

        ApiError error = ApiError.of(status.value(), status.getReasonPhrase(), message, request.getRequestURI());
        return ResponseEntity.status(status).body(error);
    }
}

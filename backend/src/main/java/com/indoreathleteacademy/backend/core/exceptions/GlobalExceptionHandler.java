package com.indoreathleteacademy.backend.core.exceptions;

import com.indoreathleteacademy.backend.core.dto.ApiError;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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

    private ResponseEntity<ApiError> buildErrorResponse(HttpStatus status, Exception e,  HttpServletRequest request) {
        var apiError = ApiError.of(status.value(), status.getReasonPhrase(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(apiError);
    }
}

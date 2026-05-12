package com.indoreathleteacademy.backend.auth.controllers;

import com.indoreathleteacademy.backend.auth.dtos.UserDto;
import com.indoreathleteacademy.backend.auth.services.UserService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

//    ---------------------------------------------- PUBLIC ENDPOINTS ------------------------------------------------
    @GetMapping("/check/username/{username}")
    ResponseEntity<Boolean> findByUsername(@PathVariable("username") String username) {
        return ResponseEntity.ok(userService.existsByUsername(username));
    }


//    ---------------------------------------------- PRIVATE ENDPOINTS ------------------------------------------------
    @GetMapping("/email/{emailId}")
    ResponseEntity<UserDto> getUserByEmailId(@PathVariable("emailId") String emailId) {
        return ResponseEntity.ok(userService.getUserByEmailId(emailId));
    }

    @GetMapping("/username/{username}")
    ResponseEntity<UserDto> getUserByUsername(@PathVariable("username") String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @GetMapping("/id/{id}")
    ResponseEntity<UserDto> getUserById(@PathVariable("id") String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

}

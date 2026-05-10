package com.indoreathleteacademy.backend.auth.utils;

import com.indoreathleteacademy.backend.auth.dtos.UserDto;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.entities.User;
import com.indoreathleteacademy.backend.auth.entities.UserAuth;

public class UserMapper {
    public static UserDto toDto(UserAuth userAuth) {
        User user = userAuth.getUser();

        return new UserDto(
                userAuth.getId(),
                userAuth.getEmailId(),
                userAuth.getUsername(),
                user.getFullName(),
                user.getAddress(),
                user.getDob(),
                user.getProfileImage(),
                userAuth.getCreatedAt(),
                userAuth.getUpdatedAt(),
                userAuth.getProvider(),
                userAuth.getRoles()
        );
    }

    public static UserAuth toUserAuth(UserDto userDto) {
        User user = User.builder()
                .dob(userDto.dob())
                .address(userDto.address())
                .fullName(userDto.fullName())
                .profileImage(userDto.profileImage())
                .build();

        UserAuth auth = UserAuth.builder()
                .emailId(userDto.email())
                .username(userDto.username())
                .roles(userDto.roles())
                .provider(userDto.provider())
                .build();

        user.setAuth(auth);
        auth.setUser(user);

        return auth;
    }

    public static UserAuth toUserAuth(UserRegisterDto dto) {
        User user = User.builder()
                .dob(dto.dob())
                .address(dto.address())
                .fullName(dto.fullName())
                .build();

        UserAuth auth = UserAuth.builder()
                .emailId(dto.email())
                .username(dto.username())
                .build();

        user.setAuth(auth);
        auth.setUser(user);

        return auth;
    }
}

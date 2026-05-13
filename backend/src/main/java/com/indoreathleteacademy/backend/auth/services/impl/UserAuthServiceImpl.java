package com.indoreathleteacademy.backend.auth.services.impl;

import com.indoreathleteacademy.backend.auth.dtos.UserLoginDto;
import com.indoreathleteacademy.backend.auth.dtos.TokenResponse;
import com.indoreathleteacademy.backend.auth.dtos.UserRegisterDto;
import com.indoreathleteacademy.backend.auth.entities.RefreshToken;
import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import com.indoreathleteacademy.backend.auth.repositories.RefreshTokenRepository;
import com.indoreathleteacademy.backend.auth.security.CookieService;
import com.indoreathleteacademy.backend.auth.security.JwtService;
import com.indoreathleteacademy.backend.auth.services.UserAuthService;
import com.indoreathleteacademy.backend.auth.services.UserService;

import com.indoreathleteacademy.backend.core.utils.CoreUtils;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Arrays;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserAuthServiceImpl implements UserAuthService {

    private final UserService userService;
    private final JwtService jwtService;
    private final CookieService cookieService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    @Override
    public void register(UserRegisterDto dto) {
        userService.createUser(dto);
    }

    @Transactional
    public ResponseEntity<Object> logout(HttpServletRequest request, HttpServletResponse response) {
        String token = readRefreshTokenFromCookie(request);

        try {
            if(jwtService.isRefreshToken(token)) {
                UUID jti = jwtService.getJti(token);
                refreshTokenRepository.findByJti(jti).ifPresent(rt -> {
                    rt.setRevoked(true);
                    refreshTokenRepository.save(rt);
                });
            }
        } catch (JwtException ignored) {}
        cookieService.clearRefreshCookie(response);
        cookieService.addNoStoreHeaders(response);
        SecurityContextHolder.clearContext();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Transactional
    @Override
    public TokenResponse login(UserLoginDto dto, HttpServletResponse response) {
        log.info("Authentication attempt for user {}", dto.identifier());
        Authentication authenticated = authenticate(dto);
        UserAuth userAuth = (UserAuth) authenticated.getPrincipal();

        UUID jti = CoreUtils.generateUuidV7();
        var refreshTokenObject = RefreshToken.of(jti, userAuth, Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()));
        var savedRefreshToken = refreshTokenRepository.save(refreshTokenObject);
        String accessToken = jwtService.generateAccessToken(savedRefreshToken.getUserAuth());
        String refreshToken = jwtService.generateRefreshToken(savedRefreshToken.getUserAuth(), savedRefreshToken.getJti());

        cookieService.attachRefreshTokenInCookie(response, refreshToken, jwtService.getRefreshTtlSeconds());

        return generateTokenResponse(accessToken, refreshToken);
    }

    @Transactional
    @Override
    public TokenResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = readRefreshTokenFromCookie(request);

        if (!jwtService.isRefreshToken(refreshToken))
            throw new BadCredentialsException("Invalid refresh token type");

        UUID jti = jwtService.getJti(refreshToken);
        UUID userAuthId = jwtService.getUserId(refreshToken);
        RefreshToken storedRefreshToken = validateRefreshToken(jti, userAuthId);

        RefreshToken savedRefreshToken = rotateRefreshToken(storedRefreshToken, response);

        String newAccessToken = jwtService.generateAccessToken(savedRefreshToken.getUserAuth());
        String newRefreshToken = jwtService.generateRefreshToken(savedRefreshToken.getUserAuth(), savedRefreshToken.getJti());

        cookieService.attachRefreshTokenInCookie(response, newRefreshToken, jwtService.getRefreshTtlSeconds());

        return generateTokenResponse(newAccessToken, newRefreshToken);
    }

    private RefreshToken validateRefreshToken(UUID jti, UUID userAuthId) {
        RefreshToken storedRefreshToken = refreshTokenRepository.findByJti(jti).orElseThrow(
                () -> new BadCredentialsException("Invalid refresh token")
        );

        if (storedRefreshToken.isRevoked() || storedRefreshToken.getExpiresAt().isBefore(Instant.now())) {
            throw new BadCredentialsException("Refresh token expired or revoked");
        }

        if (!storedRefreshToken.getUserAuth().getId().equals(userAuthId)) {
            throw new BadCredentialsException("Refresh token does not belong to this user");
        }

        return storedRefreshToken;
    }

    private RefreshToken rotateRefreshToken(RefreshToken storedRefreshToken, HttpServletResponse response){
        storedRefreshToken.setRevoked(true);
        UUID newJti = CoreUtils.generateUuidV7();
        storedRefreshToken.setReplacedByToken(newJti);

        UserAuth userAuth = storedRefreshToken.getUserAuth();

        var newRefreshTokenObj = RefreshToken.of(newJti, userAuth, Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()));
        var savedRefreshToken = refreshTokenRepository.save(newRefreshTokenObj);
        refreshTokenRepository.save(storedRefreshToken);

        return savedRefreshToken;
    }

    private String readRefreshTokenFromCookie(HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            throw new BadCredentialsException("Refresh token cookie missing");
        }

        return Arrays.stream(cookies)
                .filter(c -> cookieService.getRefreshTokenCookieName().equals(c.getName()))
                .map(Cookie::getValue)
                .filter(v -> !v.isBlank())
                .findFirst()
                .orElseThrow(() ->
                        new BadCredentialsException("Refresh token cookie missing"));
    }

    private TokenResponse generateTokenResponse(String accessToken, String refreshToken) {
        return new TokenResponse(accessToken, refreshToken, jwtService.getAccessTtlSeconds(), jwtService.getRefreshTtlSeconds());
    }
    
    private Authentication authenticate(UserLoginDto dto) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.identifier(), dto.password()));
    }
}

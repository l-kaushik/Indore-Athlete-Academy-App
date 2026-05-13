package com.indoreathleteacademy.backend.auth.security;

import com.fasterxml.uuid.Generators;
import com.indoreathleteacademy.backend.auth.entities.Role;
import com.indoreathleteacademy.backend.auth.entities.UserAuth;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Getter
public class JwtService {
    private final SecretKey key;
    private final long accessTtlSeconds;
    private final long refreshTtlSeconds;
    private final String issuer;

    public JwtService(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.access-ttl-seconds}") long accessTtlSeconds,
            @Value("${security.jwt.refresh-ttl-seconds}") long refreshTtlSeconds,
            @Value("${security.jwt.issuer}") String issuer)  {

        if(secret == null || secret.length() < 64) {
            throw new IllegalArgumentException("JWT secret must be at least 64 characters long");
        }

        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTtlSeconds = accessTtlSeconds;
        this.refreshTtlSeconds = refreshTtlSeconds;
        this.issuer = issuer;
    }

    public String generateAccessToken(UserAuth auth) {
        Instant now = Instant.now();
        List<String> roles = auth.getRoles() == null ? List.of() :
                auth.getRoles().stream().map(Role::getName).toList();
        return Jwts.builder()
                .id(Generators.timeBasedEpochGenerator().generate().toString())
                .subject(auth.getId().toString())
                .issuer(issuer)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(accessTtlSeconds)))
                .claims(Map.of(
                        "email", auth.getEmailId(),
                        "roles", roles,
                        "typ", "access"
                ))
                .signWith(key, Jwts.SIG.HS512) // HS512
                .compact();
    }

    public Jws<Claims> parse(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
    }

    public boolean isAccessToken(String token) {
        Claims c = parse(token).getPayload();
        return "access".equals(c.get("typ"));
    }

    public UUID getUserId(String token) {
        Claims c = parse(token).getPayload();
        return UUID.fromString(c.getSubject());
    }
}

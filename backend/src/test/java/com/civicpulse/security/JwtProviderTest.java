package com.civicpulse.security;

import com.civicpulse.entity.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class JwtProviderTest {
    @Test
    public void testGenerateAndValidateToken() {
        JwtProvider provider = new JwtProvider();
        provider.setJwtSecret("4pBUKF5x77owe1ANzDa6yAxtHZFySrjD2fEhSmTbeu4u");
        provider.setJwtExpirationMs(3600000);
        User user = new User();
        user.setEmail("test@example.com");
        user.setRole("ROLE_USER");
        String token = provider.generateToken(user);
        assertTrue(provider.validateToken(token));
        assertEquals("test@example.com", provider.getEmailFromToken(token));
        assertEquals("ROLE_USER", provider.getRoleFromToken(token));
    }
}

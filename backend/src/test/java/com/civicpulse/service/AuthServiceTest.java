package com.civicpulse.service;

import com.civicpulse.entity.User;
import com.civicpulse.repository.UserRepository;
import com.civicpulse.repository.OtpTokenRepository;
import com.civicpulse.security.JwtProvider;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private OtpTokenRepository otpTokenRepository;
    @Mock
    private JwtProvider jwtProvider;
    @Mock
    private EmailService emailService;
    @InjectMocks
    private AuthService authService;
    @Mock
    private PasswordEncoder passwordEncoder;

    public AuthServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegisterAndLogin() {
        String email = "test@example.com";
        String password = "password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("ROLE_USER");
        when(userRepository.findByEmail(email)).thenReturn(java.util.Optional.of(user));
        when(passwordEncoder.matches(password, user.getPassword())).thenReturn(true);
        when(jwtProvider.generateToken(user)).thenReturn("jwt-token");
        String token = authService.login(email, password);
        assertEquals("jwt-token", token);
    }
}

package com.civicpulse.controller;

import com.civicpulse.dto.AuthDtos.*;
import com.civicpulse.entity.User;
import com.civicpulse.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<OtpSendResponse> register(@RequestBody RegisterRequest req) {
        boolean sent = authService.register(req.getName(), req.getEmail(), req.getPassword());
        OtpSendResponse resp = new OtpSendResponse();
        resp.setSent(sent);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/send-otp")
    public ResponseEntity<OtpSendResponse> sendOtp(@RequestBody OtpSendRequest req) {
        authService.sendOtp(req.getEmail());
        OtpSendResponse resp = new OtpSendResponse();
        resp.setSent(true);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(@RequestBody OtpRequest req) {
        String token = authService.verifyOtp(req.getEmail(), req.getOtp());
        User user = authService.getUserRepository().findByEmail(req.getEmail()).orElse(null);
        AuthResponse resp = new AuthResponse();
        resp.setToken(token);
        resp.setUser(user);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        String token = authService.login(req.getEmail(), req.getPassword());
        User user = authService.getUserRepository().findByEmail(req.getEmail()).orElse(null);
        AuthResponse resp = new AuthResponse();
        resp.setToken(token);
        resp.setUser(user);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/me")
    public ResponseEntity<User> me(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = authService.getJwtProvider().getEmailFromToken(token);
        User user = authService.getUserRepository().findByEmail(email).orElse(null);
        return ResponseEntity.ok(user);
    }
}

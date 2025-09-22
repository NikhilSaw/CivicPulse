package com.civicpulse.dto;

import com.civicpulse.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public class AuthDtos {
    @Getter
    @Setter
    public class RegisterRequest {
        @NotBlank
        private String name;
        @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Getter
    @Setter
    public class LoginRequest {
        @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Getter
    @Setter
    public static class OtpRequest {
        @Email
        private String email;
        @NotBlank
        private String otp;
    }

    @Getter
    @Setter
    public static class AuthResponse {
        @NotBlank
        private String token;
        @NotBlank
        private User user;
    }

    @Getter
    @Setter
    public static class OtpSendRequest {
        @Email
        private String email;
    }

    @Getter
    @Setter
    public static class OtpSendResponse {
        @NotBlank
        private boolean sent;
    }
}

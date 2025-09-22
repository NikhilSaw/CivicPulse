package com.civicpulse.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "otp_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String email;
    @Column(name = "otp_code", nullable = false)
    private String otpCode;
    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;
    private Integer attempts = 0;
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}

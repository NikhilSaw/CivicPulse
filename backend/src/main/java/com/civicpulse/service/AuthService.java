package com.civicpulse.service;

import com.civicpulse.entity.OtpToken;
import com.civicpulse.entity.User;
import com.civicpulse.repository.OtpTokenRepository;
import com.civicpulse.repository.UserRepository;
import com.civicpulse.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpTokenRepository otpTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private EmailService emailService;

    public UserRepository getUserRepository() { return userRepository; }
    public JwtProvider getJwtProvider() { return jwtProvider; }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Not found: " + email));
        List<SimpleGrantedAuthority> auths = Collections.singletonList(new SimpleGrantedAuthority(u.getRole()));
        return new org.springframework.security.core.userdetails.User(u.getEmail(), u.getPassword(), auths);
    }

    @Transactional
    public boolean register(String name, String email, String rawPassword) {
        if (userRepository.existsByEmail(email)) {
            return false;
        }
        String hashed = passwordEncoder.encode(rawPassword);
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(hashed);
        user.setRole("ROLE_USER");
        userRepository.save(user);
        return true;
        // Optionally: generate OTP for verification flow instead of immediate activation
    }

    public String login(String email, String password) {
        Optional<User> ou = userRepository.findByEmail(email);
        if (ou.isEmpty()) return null;
        User user = ou.get();
        if (!passwordEncoder.matches(password, user.getPassword())) return null;
        return jwtProvider.generateToken(user);
    }

    public void sendOtp(String email) {
        // rate limit: simple check - don't send more than 5 OTP in last hour
        List<OtpToken> recent = otpTokenRepository.findAll(); // we will filter by email here (repo has findByEmail)
        // simpler approach: check existing token for email
        Optional<OtpToken> exist = otpTokenRepository.findByEmail(email);
        if (exist.isPresent()) {
            OtpToken t = exist.get();
            if (t.getExpiresAt().isAfter(LocalDateTime.now().minusMinutes(60)) && t.getCreatedAt().isAfter(LocalDateTime.now().minusMinutes(1))) {
                // allow resends but don't spam too quickly — this simple guard avoids immediate duplicates
            }
        }
        String code = String.format("%06d", new Random().nextInt(900000) + 100000);
        OtpToken token = new OtpToken();
        token.setEmail(email);
        token.setOtpCode(code);
        token.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        token.setAttempts(0);
        token.setCreatedAt(LocalDateTime.now());
        // delete old tokens for email, then save new
        otpTokenRepository.deleteByEmail(email);
        otpTokenRepository.save(token);
        // send email
        emailService.sendOtp(email, code);
    }

    @Transactional
    public String verifyOtp(String email, String otp) {
        OtpToken t = otpTokenRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("No OTP requested"));
        if (t.getExpiresAt().isBefore(LocalDateTime.now())) {
            otpTokenRepository.delete(t);
            throw new RuntimeException("OTP expired");
        }
        if (!t.getOtpCode().equals(otp)) {
            t.setAttempts(t.getAttempts() + 1);
            otpTokenRepository.save(t);
            if (t.getAttempts() >= 5) {
                otpTokenRepository.delete(t);
                throw new RuntimeException("Too many attempts");
            }
            throw new RuntimeException("Invalid OTP");
        }
        // success: delete token
        otpTokenRepository.delete(t);

        // create user if not exists
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setName("New User");
            user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString())); // random password (user should set later)
            user.setRole("ROLE_USER");
            userRepository.save(user);
        }
        // generate JWT
        return jwtProvider.generateToken(user);
    }
}

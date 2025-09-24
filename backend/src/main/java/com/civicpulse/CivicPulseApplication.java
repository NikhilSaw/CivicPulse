package com.civicpulse;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.civicpulse.repository.UserRepository;
import com.civicpulse.entity.User;

@SpringBootApplication
public class CivicPulseApplication {
    public static void main(String[] args) {
        SpringApplication.run(CivicPulseApplication.class, args);
    }

    @Bean
    public CommandLineRunner seedAdmin(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (!userRepository.existsByEmail("admin@gmail.com")) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(encoder.encode("admin")); // change to secure password
                admin.setRole("ROLE_ADMIN");
                userRepository.save(admin);
                System.out.println("Seeded admin user: admin@gmail.com / admin");
            }
        };
    }
}

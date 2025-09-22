package com.civicpulse.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String email, String otp) {
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            helper.setTo(email);
            helper.setSubject("Your CivicPulse OTP code");
            String html = "<p>Your CivicPulse OTP is: <b>" + otp + "</b></p><p>This code expires in 5 minutes.</p>";
            helper.setText(html, true);
            mailSender.send(msg);
        } catch (MessagingException ex) {
            throw new RuntimeException("Failed to send OTP email", ex);
        }
    }
}

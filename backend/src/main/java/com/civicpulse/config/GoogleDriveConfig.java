package com.civicpulse.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GoogleDriveConfig {
    @Value("${gdrive.service.account.path}")
    private String serviceAccountPath;

    @Value("${gdrive.parent.folder.id}")
    private String parentFolderId;

    @Bean
    public String googleServiceAccountPath() {
        return serviceAccountPath;
    }

    @Bean
    public String googleDriveParentFolderId() {
        return parentFolderId;
    }
}

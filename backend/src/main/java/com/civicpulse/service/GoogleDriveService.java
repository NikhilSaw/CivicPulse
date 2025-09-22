package com.civicpulse.service;

import com.google.api.client.http.InputStreamContent;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.Permission;
import com.google.api.services.drive.model.File;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.ServiceAccountCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Collections;

@Service
public class GoogleDriveService {
    @Value("${gdrive.service.account.path}")
    private String serviceAccountPath;

    @Value("${gdrive.parent.folder.id}")
    private String parentFolderId;

    private Drive buildDrive() throws Exception {
        try (FileInputStream is = new FileInputStream(serviceAccountPath)) {
            ServiceAccountCredentials credentials = (ServiceAccountCredentials) ServiceAccountCredentials.fromStream(is)
                    .createScoped(Collections.singleton(DriveScopes.DRIVE));
            return new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance(),
                    new HttpCredentialsAdapter(credentials))
                    .setApplicationName("CivicPulse").build();
        }
    }

    public DriveFileInfo uploadFile(MultipartFile multipart) throws Exception {
        if (multipart == null || multipart.isEmpty())
            throw new IllegalArgumentException("File is empty");
        if (multipart.getSize() > 5 * 1024 * 1024L)
            throw new IllegalArgumentException("File too large (max 5MB)");

        Drive drive = buildDrive();

        File fileMetadata = new File();
        fileMetadata.setName(multipart.getOriginalFilename());
        fileMetadata.setParents(Collections.singletonList(parentFolderId));

        try (InputStream is = multipart.getInputStream()) {
            InputStreamContent contentStream = new InputStreamContent(multipart.getContentType(), is);
            File uploaded = drive.files().create(fileMetadata, contentStream)
                    .setFields("id, webViewLink, webContentLink")
                    .execute();

            // set permission to anyone with link
            Permission permission = new Permission();
            permission.setType("anyone");
            permission.setRole("reader");
            drive.permissions().create(uploaded.getId(), permission).execute();

            return new DriveFileInfo(uploaded.getId(), uploaded.getWebViewLink(), uploaded.getWebContentLink());
        }
    }

    // simple DTO
    public static record DriveFileInfo(String fileId, String webViewLink, String webContentLink) {
    }
}

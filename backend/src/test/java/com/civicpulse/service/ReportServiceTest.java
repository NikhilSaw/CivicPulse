package com.civicpulse.service;

import com.civicpulse.entity.Report;
import com.civicpulse.entity.User;
import com.civicpulse.repository.ReportRepository;
import com.civicpulse.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReportServiceTest {
    @Mock
    private com.civicpulse.repository.ReportImageRepository reportImageRepository;
    @Mock
    private ReportRepository reportRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private GoogleDriveService googleDriveService;
    @InjectMocks
    private ReportService reportService;

    public ReportServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateReport() throws Exception {
        User user = new User();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(user));
        when(reportRepository.save(any(Report.class))).thenAnswer(i -> i.getArgument(0));
        MultipartFile file = mock(MultipartFile.class);
        when(file.getSize()).thenReturn(1024L);
        when(file.getContentType()).thenReturn("image/png");
    when(googleDriveService.uploadFile(file)).thenReturn(new GoogleDriveService.DriveFileInfo("id", "link", "contentLink"));
    Report report = reportService.createReport(1L, "title", "desc", "cat", 0.0, 0.0, new MultipartFile[]{file});
        assertEquals("title", report.getTitle());
        assertEquals(1, report.getImages().size());
        assertEquals("id", report.getImages().get(0).getGdriveFileId());
    }
}

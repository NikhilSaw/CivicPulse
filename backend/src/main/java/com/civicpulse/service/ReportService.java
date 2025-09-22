package com.civicpulse.service;

import com.civicpulse.entity.*;
import com.civicpulse.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    @Autowired private ReportRepository reportRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ReportImageRepository reportImageRepository;
    @Autowired private ReportStatusHistoryRepository historyRepository;
    @Autowired private GoogleDriveService googleDriveService;

    @Transactional
    public Report createReport(Long userId, String title, String description,
                               String category, Double latitude, Double longitude,
                               MultipartFile[] images) throws Exception {
        User user = userRepository.findById(userId).orElseThrow();
        Report report = new Report();
        report.setUser(user);
        report.setTitle(title);
        report.setDescription(description);
        report.setCategory(category);
        report.setLatitude(latitude);
        report.setLongitude(longitude);
        report.setStatus("NEW");
        report.setCreatedAt(LocalDateTime.now());
        report.setUpdatedAt(LocalDateTime.now());

        report = reportRepository.save(report);

        if (images != null) {
            List<ReportImage> saved = new ArrayList<>();
            for (MultipartFile img : images) {
                GoogleDriveService.DriveFileInfo info = googleDriveService.uploadFile(img);
                ReportImage ri = new ReportImage();
                ri.setReport(report);
                ri.setGdriveFileId(info.fileId());
                ri.setGdriveLink(info.webViewLink());
                reportImageRepository.save(ri);
                saved.add(ri);
            }
            report.setImages(saved);
        }

        return report;
    }

    @Transactional
    public void updateReportStatus(Long reportId, String newStatus, String changedBy, String note) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new EntityNotFoundException("Report not found"));
        String prev = report.getStatus();
        report.setStatus(newStatus);
        report.setUpdatedAt(LocalDateTime.now());
        reportRepository.save(report);

        ReportStatusHistory hist = new ReportStatusHistory();
        hist.setReport(report);
        hist.setPreviousStatus(prev);
        hist.setNewStatus(newStatus);
        hist.setChangedBy(changedBy);
        hist.setNote(note);
        historyRepository.save(hist);
    }

    @Transactional
    public void assignReport(Long reportId, String department, Long assignedToUserId) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        report.setAssignedDepartment(department);
        if (assignedToUserId != null) {
            User assignee = userRepository.findById(assignedToUserId).orElseThrow();
            report.setAssignedTo(assignee);
        }
        reportRepository.save(report);

        ReportStatusHistory hist = new ReportStatusHistory();
        hist.setReport(report);
        hist.setPreviousStatus(report.getStatus());
        hist.setNewStatus(report.getStatus());
        hist.setChangedBy("system");
        hist.setNote("Assigned to " + department + (assignedToUserId != null ? " user " + assignedToUserId : ""));
        historyRepository.save(hist);
    }

    public List<Report> getReports(String status, String category) {
        return reportRepository.findByStatusAndCategory(status, category);
    }

    public Report getReport(Long reportId) {
        return reportRepository.findById(reportId).orElseThrow();
    }

    public List<Report> getUserReports(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return reportRepository.findByUser(user);
    }
}

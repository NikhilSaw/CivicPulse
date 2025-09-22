package com.civicpulse.controller;

import com.civicpulse.dto.ReportDtos;
import com.civicpulse.entity.Report;
import com.civicpulse.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @PostMapping
    public ResponseEntity<ReportDtos.ReportResponse> createReport(
            @RequestParam Long userId,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam("images") List<MultipartFile> images) {
        // Sanitize text fields
        String safeTitle = org.springframework.web.util.HtmlUtils.htmlEscape(title);
        String safeDescription = org.springframework.web.util.HtmlUtils.htmlEscape(description);
        String safeCategory = org.springframework.web.util.HtmlUtils.htmlEscape(category);
            Report report;
            try {
                report = reportService.createReport(userId, safeTitle, safeDescription, safeCategory, latitude,
                longitude, images != null ? images.toArray(new MultipartFile[0]) : null);
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        ReportDtos.ReportResponse resp = new ReportDtos.ReportResponse();
        resp.id = report.getId();
        resp.title = report.getTitle();
        resp.description = report.getDescription();
        resp.category = report.getCategory();
        resp.latitude = report.getLatitude();
        resp.longitude = report.getLongitude();
        resp.status = report.getStatus();
        resp.images = new java.util.ArrayList<>();
        if (report.getImages() != null) {
            for (com.civicpulse.entity.ReportImage img : report.getImages()) {
                ReportDtos.ImageDto dto = new ReportDtos.ImageDto();
                dto.gdriveFileId = img.getGdriveFileId();
                dto.gdriveLink = img.getGdriveLink();
                resp.images.add(dto);
            }
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Report>> getMyReports(@RequestParam Long userId) {
        List<Report> reports = reportService.getUserReports(userId);
        return ResponseEntity.ok(reports);
    }

    @GetMapping
    public ResponseEntity<List<Report>> getReports(@RequestParam(required = false) String status,
            @RequestParam(required = false) String category) {
        List<Report> reports = reportService.getReports(status, category);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getReport(@PathVariable Long id) {
        Report report = reportService.getReport(id);
        return ResponseEntity.ok(report);
    }
}

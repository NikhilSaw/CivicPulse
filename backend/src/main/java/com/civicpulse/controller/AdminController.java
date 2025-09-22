package com.civicpulse.controller;

import com.civicpulse.entity.Report;
import com.civicpulse.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired private ReportService reportService;

    @PutMapping("/reports/{id}/status")
    public ResponseEntity<?> changeStatus(@PathVariable Long id,
                                          @RequestBody Map<String, String> body,
                                          @AuthenticationPrincipal UserDetails admin) {
        reportService.updateReportStatus(
                id,
                body.get("status"),
                admin.getUsername(),
                body.getOrDefault("note", "")
        );
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PutMapping("/reports/{id}/assign")
    public ResponseEntity<?> assignReport(@PathVariable Long id,
                                          @RequestBody Map<String, Object> body) {
        String dept = (String) body.get("department");
        Long assignedTo = body.get("assignedTo") != null ? Long.valueOf(body.get("assignedTo").toString()) : null;
        reportService.assignReport(id, dept, assignedTo);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping("/reports")
    public ResponseEntity<List<Report>> listReports(@RequestParam(required = false) String status,
                                                    @RequestParam(required = false) String category) {
        return ResponseEntity.ok(reportService.getReports(status, category));
    }
}

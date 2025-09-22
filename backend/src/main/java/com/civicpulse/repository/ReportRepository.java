package com.civicpulse.repository;

import com.civicpulse.entity.Report;
import com.civicpulse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUser(@Param("user") User user);

    @Query("SELECT r FROM Report r WHERE (:status IS NULL OR r.status = :status) AND (:category IS NULL OR r.category = :category)")
    List<Report> findByStatusAndCategory(@Param("status") String status, @Param("category") String category);

    long countByStatus(String status);
}

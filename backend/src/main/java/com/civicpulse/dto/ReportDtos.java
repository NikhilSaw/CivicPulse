package com.civicpulse.dto;

import java.util.List;

public class ReportDtos {
    public static class CreateReportRequest {
        public String title;
        public String description;
        public String category;
        public Double latitude;
        public Double longitude;
        public List<Object> images; // Use MultipartFile in controller
    }
    public static class ReportResponse {
        public Long id;
        public String title;
        public String description;
        public String category;
        public Double latitude;
        public Double longitude;
        public String status;
        public List<ImageDto> images;
    }
    public static class ImageDto {
        public String gdriveFileId;
        public String gdriveLink;
    }
}

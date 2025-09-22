# Civic Pulse Backend

## Overview
Spring Boot REST backend for Civic Pulse frontend. Implements authentication, report management, file uploads to Google Drive, and admin analytics.

## Requirements
- Java 17+
- Maven
- MySQL
- Google Drive Service Account JSON (not committed)

## Environment Variables
See `.env.example` for all required variables:
- Database: `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`
- JWT: `JWT_SECRET`, `JWT_EXPIRATION_MS`
- Email: `SPRING_MAIL_HOST`, `SPRING_MAIL_PORT`, `SPRING_MAIL_USERNAME`, `SPRING_MAIL_PASSWORD`
- Google Drive: `GDRIVE_SERVICE_ACCOUNT_JSON_PATH`, `GDRIVE_PARENT_FOLDER_ID`

## Setup
1. Copy `.env.example` to `.env` and fill in secrets.
2. Place Google service account JSON in `backend/config/credentials.json` and set the path in `.env`.
3. Build and run:
   ```sh
   mvn clean package
   docker-compose up --build
   ```

## API Docs
- Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## Google Drive Setup
- Create a service account in Google Cloud Console.
- Download JSON credentials and place in `backend/config/credentials.json`.
- Share the target folder (`GDRIVE_PARENT_FOLDER_ID`) with the service account email.

## Testing
- Unit tests: `mvn test`
- Integration tests use Testcontainers for MySQL.

## CI
- See `.github/workflows/ci.yml` for build/test pipeline.

## Postman
- See `postman_collection.json` for example requests.

## Notes
- Do not commit secrets or credentials.
- For development, use `application-dev.properties` with placeholders.

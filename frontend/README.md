# CivicConnect - Civic Issue Reporting Platform

A modern, responsive web application for reporting and managing civic issues like potholes, broken street lights, sanitation problems, and more.

## 🚀 Quick Start

### Demo Credentials

**Admin Login:**
- Email: `admin@gmail.com`
- Password: `admin`

**User Login:**
- Email: `user@gmail.com`
- Password: `user123`

**OTP Verification (for registration):**
- Use OTP: `123456` for demo purposes

### Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Mock Mode Features

- **Registration Flow**: Register → Email OTP Verification → Dashboard
- **Authentication**: Login with demo credentials or register new accounts
- **User Dashboard**: Submit reports, track your issues, view impact metrics
- **Admin Dashboard**: Manage all reports, view analytics, assign departments
- **Public Access**: Browse issues, report problems, view live map (no login required)
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **React Router** for navigation
- **TailwindCSS** for styling
- **Recharts** for analytics visualization
- **Context API** for state management
- **LocalStorage** for demo persistence

### Current Implementation (Mock Mode)
All backend interactions are currently mocked using:
- `src/utils/apiClient.ts` - Mock API functions with simulated latency
- `src/context/AuthContext.tsx` - Authentication state management
- LocalStorage persistence for demo user sessions

### TODO: Backend Integration
The following endpoints need to be implemented in Java Spring Boot:

#### Authentication Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User authentication
- `POST /api/v1/auth/send-otp` - Send email OTP
- `POST /api/v1/auth/verify-otp` - Verify email OTP
- `POST /api/v1/auth/logout` - Invalidate session

#### Reports Endpoints
- `GET /api/v1/reports` - Fetch all reports
- `POST /api/v1/reports` - Submit new report
- `PUT /api/v1/reports/{id}` - Update report status
- `DELETE /api/v1/reports/{id}` - Delete report

#### Admin Endpoints
- `GET /api/v1/admin/analytics` - Dashboard analytics
- `GET /api/v1/admin/departments` - Department management
- `PUT /api/v1/admin/reports/{id}/assign` - Assign report to department

## 📱 Features

### Public Features (No Login Required)
- View and report civic issues
- Browse interactive map of reported issues
- Learn about the platform (About page)
- Contact city administrators

### User Features
- Register account with email verification
- Submit detailed issue reports with photos
- Track personal report history
- View community impact metrics
- Mobile-friendly interface

### Admin Features
- Comprehensive dashboard with analytics
- Manage all citizen reports
- Assign issues to departments
- Update report statuses
- View detailed analytics and charts
- Department management tools

## 🎨 Design System

The application uses a custom design system built with TailwindCSS:
- Civic-themed color palette
- Consistent typography and spacing
- Responsive breakpoints
- Dark/light mode support
- Accessible component library

## 🔧 Development

### Project Structure
```
src/
├── components/ui/          # Reusable UI components
├── context/               # React Context providers
├── pages/                 # Page components
│   ├── admin/            # Admin-only pages
│   └── user/             # User-only pages
├── routes/               # Route protection
├── utils/                # Utility functions and API client
└── hooks/                # Custom React hooks
```

### Adding New Features
1. Update mock functions in `src/utils/apiClient.ts`
2. Add TODO comments referencing Java endpoints
3. Implement UI components using the design system
4. Add proper error handling and loading states

## 📋 Roadmap

### Phase 1: Backend Integration
- [ ] Replace mock API with real Java Spring Boot endpoints
- [ ] Implement JWT-based authentication
- [ ] Set up database schema for reports and users
- [ ] Add email service for OTP delivery

### Phase 2: Enhanced Features
- [ ] File upload for report attachments
- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] Mobile app (React Native)

### Phase 3: Advanced Analytics
- [ ] Geospatial analysis
- [ ] Predictive analytics
- [ ] Performance dashboards
- [ ] Integration with city systems

## 🤝 Contributing

When contributing to this project:
1. Maintain the mock/TODO pattern for backend calls
2. Follow the established design system
3. Add proper TypeScript types
4. Test on both desktop and mobile
5. Update this README for significant changes

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Router
- Recharts

## 📄 License

This project is part of a civic technology initiative. Contact your city administrator for usage guidelines.

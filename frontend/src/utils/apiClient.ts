// This is a mock API client
// Replace these functions later with real fetch/axios calls to your Java backend

export interface Report {
  id: number;
  title: string;
  location: string;
  status: "Pending" | "In Progress" | "Resolved";
  description?: string;
  category?: string;
  priority?: "Low" | "Medium" | "High";
  createdAt?: string;
}

export async function loginApi(email: string, password: string) {
  // TODO: Replace with POST /api/v1/auth/login (Java Spring Boot)
  return new Promise<{ token: string; role: "admin" | "user" }>((resolve, reject) =>
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin") {
        resolve({ token: "mock-jwt-admin", role: "admin" });
      } else if (email === "user@gmail.com" && password === "user123") {
        resolve({ token: "mock-jwt-user", role: "user" });
      } else {
        reject(new Error("Invalid credentials. Use admin@gmail.com/admin or user@gmail.com/user123"));
      }
    }, 1000)
  );
}

export async function registerApi(name: string, email: string, password: string) {
  // TODO: Replace with POST /api/v1/auth/register (Java Spring Boot)
  return new Promise<{ success: boolean }>((resolve) =>
    setTimeout(() => resolve({ success: true }), 1000)
  );
}

export async function sendOtpApi(email: string) {
  // TODO: Replace with POST /api/v1/auth/send-otp (Java Spring Boot)
  return new Promise<{ sent: boolean }>((resolve) =>
    setTimeout(() => resolve({ sent: true }), 1000)
  );
}

export async function verifyOtpApi(email: string, otp: string) {
  // TODO: Replace with POST /api/v1/auth/verify-otp (Java Spring Boot)
  return new Promise<{ token: string; role: "admin" | "user" }>((resolve, reject) =>
    setTimeout(() => {
      if (otp === "123456") {
        resolve({ 
          token: "mock-jwt-verified", 
          role: email.includes("admin") ? "admin" : "user" 
        });
      } else {
        reject(new Error("Invalid OTP. Use 123456 for demo"));
      }
    }, 1000)
  );
}

export async function getReports(): Promise<Report[]> {
  // TODO: call GET /api/reports
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { 
            id: 1, 
            title: "Pothole on Main Street", 
            location: "Main Street & 1st Ave", 
            status: "Pending",
            description: "Large pothole causing traffic issues",
            category: "Roads",
            priority: "High",
            createdAt: "2024-01-15"
          },
          { 
            id: 2, 
            title: "Broken Street Light", 
            location: "2nd Ave & Oak St", 
            status: "Resolved",
            description: "Street light not working at night",
            category: "Lighting",
            priority: "Medium",
            createdAt: "2024-01-10"
          },
          { 
            id: 3, 
            title: "Overflowing Trash Bin", 
            location: "City Park", 
            status: "In Progress",
            description: "Trash bin needs to be emptied",
            category: "Sanitation",
            priority: "Low",
            createdAt: "2024-01-12"
          },
        ]),
      1000
    )
  );
}

export async function submitReport(data: Partial<Report>): Promise<Report> {
  // TODO: call POST /api/reports
  return new Promise((resolve) =>
    setTimeout(() => resolve({ 
      success: true, 
      id: Date.now(), 
      status: "Pending" as const,
      createdAt: new Date().toISOString().split('T')[0],
      ...data 
    } as Report), 1000)
  );
}
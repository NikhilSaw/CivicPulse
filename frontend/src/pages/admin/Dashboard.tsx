import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  MapPin,
  Calendar,
  Filter
} from "lucide-react";
import { Report } from "@/utils/apiClient";

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "resolved">("all");

  // Mock admin reports data
  const mockReports: Report[] = [
    {
      id: 1,
      title: "Pothole on Main Street",
      location: "Main Street & 1st Ave",
      status: "Pending",
      description: "Large pothole causing traffic issues",
      category: "Roads",
      priority: "High",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Broken Street Light",
      location: "2nd Ave & Oak St",
      status: "In Progress",
      description: "Street light not working at night",
      category: "Lighting",
      priority: "Medium",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      title: "Overflowing Trash Bin",
      location: "City Park",
      status: "Resolved",
      description: "Trash bin needs to be emptied",
      category: "Sanitation",
      priority: "Low",
      createdAt: "2024-01-12",
    },
    {
      id: 4,
      title: "Graffiti on Building",
      location: "5th Street Plaza",
      status: "Pending",
      description: "Vandalism on public building wall",
      category: "Safety & Security",
      priority: "Medium",
      createdAt: "2024-01-14",
    },
    {
      id: 5,
      title: "Tree Branch Down",
      location: "Elm Park",
      status: "In Progress",
      description: "Storm damaged tree blocking walkway",
      category: "Parks & Environment",
      priority: "High",
      createdAt: "2024-01-13",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === "Pending").length,
    inProgress: reports.filter(r => r.status === "In Progress").length,
    resolved: reports.filter(r => r.status === "Resolved").length,
    highPriority: reports.filter(r => r.priority === "High").length,
  };

  const filteredReports = reports.filter(report => {
    if (filter === "all") return true;
    if (filter === "pending") return report.status === "Pending";
    if (filter === "in-progress") return report.status === "In Progress";
    if (filter === "resolved") return report.status === "Resolved";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Resolved":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-700 border-red-200";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const updateReportStatus = (reportId: number, newStatus: "Pending" | "In Progress" | "Resolved") => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
    // TODO: Call API to update report status
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor and manage civic issues across your community.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-10 h-10 gradient-hero rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-success">{stats.resolved}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Admin Tools
                  </h3>
                  <p className="text-muted-foreground">
                    Manage reports, departments, and view analytics.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link to="/admin/reports">
                    <Button variant="outline">
                      Manage Reports
                    </Button>
                  </Link>
                  <Link to="/admin/analytics">
                    <Button variant="outline">
                      View Analytics
                    </Button>
                  </Link>
                  <Link to="/admin/departments">
                    <Button>
                      Departments
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Manage and update the status of civic issue reports
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading reports...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-foreground">{report.title}</h3>
                          <div className="flex gap-2">
                            <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                              {report.status}
                            </Badge>
                            <Badge className={`text-xs ${getPriorityColor(report.priority)}`}>
                              {report.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{report.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{report.createdAt}</span>
                          </div>
                          <span className="bg-muted px-2 py-1 rounded text-xs">
                            {report.category}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Select
                          value={report.status}
                          onValueChange={(value: "Pending" | "In Progress" | "Resolved") => 
                            updateReportStatus(report.id, value)
                          }
                        >
                          <SelectTrigger className="w-full sm:w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl">{report.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="flex gap-4">
                                <Badge className={`${getStatusColor(report.status)}`}>
                                  {report.status}
                                </Badge>
                                <Badge className={`${getPriorityColor(report.priority)}`}>
                                  {report.priority} Priority
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                                  <p className="text-sm text-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" />
                                    {report.location}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                                  <p className="text-sm text-foreground mt-1">{report.category}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Created Date</p>
                                  <p className="text-sm text-foreground flex items-center gap-1 mt-1">
                                    <Calendar className="h-3 w-3" />
                                    {report.createdAt}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Description</p>
                                <p className="text-sm text-foreground mt-2 p-3 bg-muted rounded-lg">
                                  {report.description}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredReports.length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No reports found
                    </h3>
                    <p className="text-muted-foreground">
                      {filter === "all" 
                        ? "No reports have been submitted yet." 
                        : `No ${filter.replace('-', ' ')} reports found.`
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
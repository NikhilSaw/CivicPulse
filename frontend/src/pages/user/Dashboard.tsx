import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plus, MapPin, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { Report } from "@/utils/apiClient";

export default function UserDashboard() {
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user reports - in real app this would come from API
  const mockUserReports: Report[] = [
    {
      id: 1,
      title: "Pothole on My Street",
      location: "Main Street & 1st Ave",
      status: "In Progress",
      description: "Large pothole near my house",
      category: "Roads",
      priority: "High",
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      title: "Broken Sidewalk",
      location: "Elm Street",
      status: "Pending",
      description: "Cracked sidewalk creating trip hazard",
      category: "Roads",
      priority: "Medium",
      createdAt: "2024-01-12",
    },
    {
      id: 7,
      title: "Street Light Out",
      location: "Park Avenue",
      status: "Resolved",
      description: "Street light not working for 3 days",
      category: "Lighting",
      priority: "Medium",
      createdAt: "2024-01-08",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserReports(mockUserReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-primary" />;
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

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

  const stats = {
    total: userReports.length,
    pending: userReports.filter(r => r.status === "Pending").length,
    inProgress: userReports.filter(r => r.status === "In Progress").length,
    resolved: userReports.filter(r => r.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your submitted reports and contribute to improving your community.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card className="shadow-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Ready to Report an Issue?
                  </h3>
                  <p className="text-muted-foreground">
                    Help improve your community by reporting civic issues you encounter.
                  </p>
                </div>
                <Link to="/user/submit">
                  <Button className="shadow-civic flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Submit New Report
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
        </div>

        {/* Recent Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Recent Reports</span>
                <Link to="/user/reports">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardTitle>
              <CardDescription>
                Track the status of your submitted civic issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading your reports...</p>
                </div>
              ) : userReports.length > 0 ? (
                <div className="space-y-4">
                  {userReports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth">
                      <div className="flex-shrink-0">
                        {getStatusIcon(report.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{report.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">{report.location}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                            {report.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{report.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Reports Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't submitted any reports. Start by reporting an issue you've noticed.
                  </p>
                  <Link to="/user/submit">
                    <Button>Submit Your First Report</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Community Impact */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Community Impact
              </CardTitle>
              <CardDescription>
                See how your contributions help improve the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stats.resolved}
                </div>
                <p className="text-sm text-muted-foreground">
                  Issues you've helped resolve
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Resolution Rate</span>
                  <span className="text-sm font-medium">
                    {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Keep reporting issues to help make your community better!
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Link to="/map" className="block">
                  <Button variant="outline" className="w-full">
                    View Community Map
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
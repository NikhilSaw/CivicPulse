import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Filter, RefreshCw, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Report } from "@/utils/apiClient";

export default function LiveMap() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "resolved" | "in-progress">("all");
  const [isLoading, setIsLoading] = useState(false);

  // Mock map data - in real app this would come from API
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
    // Simulate loading reports
    setIsLoading(true);
    setTimeout(() => {
      setReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredReports = reports.filter(report => {
    if (filter === "all") return true;
    if (filter === "pending") return report.status === "Pending";
    if (filter === "resolved") return report.status === "Resolved";
    if (filter === "in-progress") return report.status === "In Progress";
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <AlertTriangle className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "destructive";
      case "In Progress":
        return "warning";
      case "Resolved":
        return "success";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "Low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Live Issue Map
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            See all reported civic issues in your area in real-time. 
            Track progress and stay informed about your community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Interactive Map
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLoading(true)}
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Interactive Map Coming Soon
                    </h3>
                    <p className="text-muted-foreground">
                      This will display a real-time map with pinned locations of all reported issues.
                      <br />
                      Click on any report in the sidebar to see details.
                    </p>
                    <div className="mt-4 text-sm text-muted-foreground">
                      {/* TODO: Integrate with mapping service (Google Maps, Mapbox, etc.) */}
                      <code className="bg-muted px-2 py-1 rounded text-xs">
                        TODO: Connect mapping service
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Sidebar */}
          <div className="space-y-6">
            {/* Filter Controls */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Filter Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    className="text-xs"
                  >
                    All ({reports.length})
                  </Button>
                  <Button
                    variant={filter === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("pending")}
                    className="text-xs"
                  >
                    Pending ({reports.filter(r => r.status === "Pending").length})
                  </Button>
                  <Button
                    variant={filter === "in-progress" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("in-progress")}
                    className="text-xs"
                  >
                    In Progress ({reports.filter(r => r.status === "In Progress").length})
                  </Button>
                  <Button
                    variant={filter === "resolved" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("resolved")}
                    className="text-xs"
                  >
                    Resolved ({reports.filter(r => r.status === "Resolved").length})
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                  <p className="text-muted-foreground">Loading reports...</p>
                </div>
              ) : (
                filteredReports.map((report) => (
                  <Card
                    key={report.id}
                    className={`cursor-pointer transition-smooth hover:shadow-card ${
                      selectedReport?.id === report.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm leading-tight">{report.title}</h3>
                          {getStatusIcon(report.status)}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{report.location}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant={getStatusColor(report.status) as any} className="text-xs">
                            {report.status}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {report.category} • {report.createdAt}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Selected Report Details */}
            {selectedReport && (
              <Card className="shadow-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Report Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{selectedReport.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedReport.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Status:</span>
                      <br />
                      <Badge variant={getStatusColor(selectedReport.status) as any} className="mt-1">
                        {selectedReport.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Priority:</span>
                      <br />
                      <Badge className={`mt-1 ${getPriorityColor(selectedReport.priority)}`}>
                        {selectedReport.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Category:</span> {selectedReport.category}
                    <br />
                    <span className="font-medium">Reported:</span> {selectedReport.createdAt}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
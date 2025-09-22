import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MapPin, 
  Calendar, 
  User, 
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface Report {
  id: number;
  title: string;
  location: string;
  status: "Pending" | "In Progress" | "Resolved";
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  createdAt: string;
  assignedTo?: string;
  userEmail?: string;
  userPhone?: string;
  estimatedCompletion?: string;
}

const ManageReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  const mockReports: Report[] = [
    {
      id: 1,
      title: "Pothole on Main Street",
      location: "Main Street & 1st Ave",
      status: "Pending",
      description: "Large pothole causing traffic issues and potential vehicle damage. Located near the intersection, approximately 3 feet wide and 6 inches deep.",
      category: "Roads & Transport",
      priority: "High",
      createdAt: "2024-01-15",
      userEmail: "john.doe@email.com",
      userPhone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      title: "Broken Street Light",
      location: "2nd Ave & Oak St",
      status: "In Progress",
      description: "Street light not working at night, causing safety concerns for pedestrians and drivers.",
      category: "Street Lighting",
      priority: "Medium",
      createdAt: "2024-01-10",
      assignedTo: "Electric Dept - John Smith",
      userEmail: "jane.smith@email.com",
      userPhone: "+1 (555) 987-6543",
      estimatedCompletion: "2024-01-18"
    },
    {
      id: 3,
      title: "Overflowing Trash Bin",
      location: "City Park - North Entrance",
      status: "Resolved",
      description: "Trash bin overflowing, attracting pests and creating unsanitary conditions.",
      category: "Sanitation",
      priority: "Low",
      createdAt: "2024-01-12",
      assignedTo: "Sanitation Dept - Mike Johnson",
      userEmail: "park.visitor@email.com",
      userPhone: "+1 (555) 456-7890"
    },
    {
      id: 4,
      title: "Graffiti on Building Wall",
      location: "5th Street Plaza",
      status: "Pending",
      description: "Vandalism on public building wall, inappropriate content visible to public.",
      category: "Safety & Security",
      priority: "Medium",
      createdAt: "2024-01-14",
      userEmail: "concerned.citizen@email.com",
      userPhone: "+1 (555) 321-0987"
    },
    {
      id: 5,
      title: "Tree Branch Blocking Walkway",
      location: "Elm Park - West Trail",
      status: "In Progress",
      description: "Storm damaged tree branch blocking main walkway, safety hazard for joggers and walkers.",
      category: "Parks & Environment",
      priority: "High",
      createdAt: "2024-01-13",
      assignedTo: "Parks Dept - Sarah Wilson",
      userEmail: "daily.jogger@email.com",
      userPhone: "+1 (555) 654-3210",
      estimatedCompletion: "2024-01-16"
    }
  ];

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status.toLowerCase().replace(" ", "-") === statusFilter;
    const matchesPriority = priorityFilter === "all" || report.priority.toLowerCase() === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-300";
      case "Resolved": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 border-red-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Low": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const updateReportStatus = (reportId: number, newStatus: "Pending" | "In Progress" | "Resolved") => {
    // TODO: Call API to update report status
    console.log(`Updating report ${reportId} status to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Manage Reports
          </h1>
          <p className="text-muted-foreground text-lg">
            View, update, and manage all civic issue reports.
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search reports by title, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>
              Reports ({filteredReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-foreground text-lg">{report.title}</h3>
                        <div className="flex gap-2">
                          <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                            {report.status}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                        {report.assignedTo && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span className="text-primary">{report.assignedTo}</span>
                          </div>
                        )}
                        {report.estimatedCompletion && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="text-warning">Due: {report.estimatedCompletion}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl">{report.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Status and Priority */}
                            <div className="flex gap-4">
                              <Badge className={`${getStatusColor(report.status)}`}>
                                {report.status}
                              </Badge>
                              <Badge className={`${getPriorityColor(report.priority)}`}>
                                {report.priority} Priority
                              </Badge>
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                                <p className="text-sm text-foreground flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {report.location}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                                <p className="text-sm text-foreground mt-1">{report.category}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Created Date</Label>
                                <p className="text-sm text-foreground flex items-center gap-1 mt-1">
                                  <Calendar className="h-3 w-3" />
                                  {report.createdAt}
                                </p>
                              </div>
                              {report.estimatedCompletion && (
                                <div>
                                  <Label className="text-sm font-medium text-muted-foreground">Est. Completion</Label>
                                  <p className="text-sm text-foreground flex items-center gap-1 mt-1">
                                    <Clock className="h-3 w-3" />
                                    {report.estimatedCompletion}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Description */}
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                              <p className="text-sm text-foreground mt-2 p-3 bg-muted rounded-lg">
                                {report.description}
                              </p>
                            </div>

                            {/* Contact Information */}
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Reporter Contact</Label>
                              <div className="mt-2 space-y-2">
                                <p className="text-sm text-foreground flex items-center gap-2">
                                  <Mail className="h-3 w-3" />
                                  {report.userEmail}
                                </p>
                                {report.userPhone && (
                                  <p className="text-sm text-foreground flex items-center gap-2">
                                    <Phone className="h-3 w-3" />
                                    {report.userPhone}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Assignment */}
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Assignment</Label>
                              <div className="mt-2">
                                {report.assignedTo ? (
                                  <p className="text-sm text-foreground flex items-center gap-2">
                                    <User className="h-3 w-3" />
                                    {report.assignedTo}
                                  </p>
                                ) : (
                                  <p className="text-sm text-muted-foreground">Not assigned yet</p>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-4 border-t">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit Report
                              </Button>
                              <Button size="sm" variant="outline">
                                Assign to Department
                              </Button>
                              <Button size="sm" variant="outline">
                                Contact Reporter
                              </Button>
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
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageReports;
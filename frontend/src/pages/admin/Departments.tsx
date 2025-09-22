import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Edit, 
  Plus,
  UserPlus,
  Settings,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface Department {
  id: number;
  name: string;
  description: string;
  head: string;
  email: string;
  phone: string;
  location: string;
  employees: number;
  activeReports: number;
  resolvedReports: number;
  avgResponseTime: string;
  categories: string[];
  status: "Active" | "Inactive";
}

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: "Roads & Transportation",
      description: "Responsible for road maintenance, traffic management, and transportation infrastructure.",
      head: "John Mitchell",
      email: "roads@city.gov",
      phone: "+1 (555) 123-4567",
      location: "City Hall - Building A, Floor 2",
      employees: 25,
      activeReports: 12,
      resolvedReports: 89,
      avgResponseTime: "2.5 days",
      categories: ["Roads & Transport", "Traffic Lights", "Parking"],
      status: "Active"
    },
    {
      id: 2,
      name: "Parks & Environment",
      description: "Manages city parks, green spaces, environmental programs, and outdoor recreational facilities.",
      head: "Sarah Wilson",
      email: "parks@city.gov",
      phone: "+1 (555) 234-5678",
      location: "Parks Administration Center",
      employees: 18,
      activeReports: 8,
      resolvedReports: 67,
      avgResponseTime: "3.2 days",
      categories: ["Parks & Environment", "Trees", "Landscaping"],
      status: "Active"
    },
    {
      id: 3,
      name: "Public Safety",
      description: "Handles security issues, emergency response, and public safety initiatives.",
      head: "Officer Maria Rodriguez",
      email: "safety@city.gov",
      phone: "+1 (555) 345-6789",
      location: "Public Safety Building",
      employees: 45,
      activeReports: 15,
      resolvedReports: 134,
      avgResponseTime: "0.8 days",
      categories: ["Safety & Security", "Emergency Response"],
      status: "Active"
    },
    {
      id: 4,
      name: "Sanitation Services",
      description: "Waste management, recycling programs, and cleanliness maintenance throughout the city.",
      head: "Mike Johnson",
      email: "sanitation@city.gov",
      phone: "+1 (555) 456-7890",
      location: "Sanitation Depot - Industrial District",
      employees: 32,
      activeReports: 6,
      resolvedReports: 156,
      avgResponseTime: "1.5 days",
      categories: ["Sanitation", "Waste Management", "Recycling"],
      status: "Active"
    },
    {
      id: 5,
      name: "Utilities & Infrastructure",
      description: "Water, electricity, street lighting, and basic infrastructure maintenance.",
      head: "David Chen",
      email: "utilities@city.gov",
      phone: "+1 (555) 567-8901",
      location: "Utilities Control Center",
      employees: 28,
      activeReports: 9,
      resolvedReports: 98,
      avgResponseTime: "2.1 days",
      categories: ["Street Lighting", "Water Systems", "Utilities"],
      status: "Active"
    },
    {
      id: 6,
      name: "Building & Planning",
      description: "Building permits, urban planning, zoning, and construction oversight.",
      head: "Emily Davis",
      email: "planning@city.gov",
      phone: "+1 (555) 678-9012",
      location: "City Hall - Building B, Floor 3",
      employees: 15,
      activeReports: 3,
      resolvedReports: 45,
      avgResponseTime: "4.2 days",
      categories: ["Public Buildings", "Zoning", "Construction"],
      status: "Active"
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const getEfficiencyRating = (avgResponseTime: string, resolvedReports: number) => {
    const responseTimeNum = parseFloat(avgResponseTime);
    if (responseTimeNum <= 1 && resolvedReports > 100) return { rating: "Excellent", color: "text-green-600 bg-green-100" };
    if (responseTimeNum <= 2.5 && resolvedReports > 60) return { rating: "Good", color: "text-blue-600 bg-blue-100" };
    if (responseTimeNum <= 4 && resolvedReports > 30) return { rating: "Average", color: "text-yellow-600 bg-yellow-100" };
    return { rating: "Needs Improvement", color: "text-red-600 bg-red-100" };
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Department Management
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage city departments and their personnel.
              </p>
            </div>
            <Button className="shadow-civic">
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </div>
        </div>

        {/* Department Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Departments</p>
                  <p className="text-2xl font-bold text-foreground">{departments.length}</p>
                </div>
                <div className="w-10 h-10 gradient-hero rounded-full flex items-center justify-center">
                  <Settings className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                  <p className="text-2xl font-bold text-foreground">
                    {departments.reduce((sum, dept) => sum + dept.employees, 0)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Reports</p>
                  <p className="text-2xl font-bold text-warning">
                    {departments.reduce((sum, dept) => sum + dept.activeReports, 0)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Activity className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {departments.map((department) => {
            const efficiency = getEfficiencyRating(department.avgResponseTime, department.resolvedReports);
            
            return (
              <Card key={department.id} className="shadow-card hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{department.name}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {department.description}
                      </p>
                    </div>
                    <Badge className={`${efficiency.color} border-0`}>
                      {efficiency.rating}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Department Head */}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Head:</span>
                    <span className="text-primary">{department.head}</span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{department.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{department.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{department.location}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{department.employees}</div>
                      <div className="text-xs text-muted-foreground">Employees</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-warning">{department.activeReports}</div>
                      <div className="text-xs text-muted-foreground">Active Reports</div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="flex items-center justify-between text-sm pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{department.avgResponseTime} avg</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>{department.resolvedReports} resolved</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {department.categories.slice(0, 2).map((category, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {department.categories.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{department.categories.length - 2} more
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setSelectedDepartment(department)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl">{department.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          {/* Basic Information */}
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                            <p className="text-sm text-foreground mt-2 p-3 bg-muted rounded-lg">
                              {department.description}
                            </p>
                          </div>

                          {/* Contact Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Department Head</Label>
                              <p className="text-sm text-foreground mt-1">{department.head}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                              <p className="text-sm text-foreground mt-1">{department.location}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                              <p className="text-sm text-foreground mt-1">{department.email}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                              <p className="text-sm text-foreground mt-1">{department.phone}</p>
                            </div>
                          </div>

                          {/* Performance Metrics */}
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Performance Overview</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                              <div className="text-center p-3 bg-muted rounded-lg">
                                <div className="text-lg font-bold text-foreground">{department.employees}</div>
                                <div className="text-xs text-muted-foreground">Total Staff</div>
                              </div>
                              <div className="text-center p-3 bg-muted rounded-lg">
                                <div className="text-lg font-bold text-warning">{department.activeReports}</div>
                                <div className="text-xs text-muted-foreground">Active Reports</div>
                              </div>
                              <div className="text-center p-3 bg-muted rounded-lg">
                                <div className="text-lg font-bold text-success">{department.resolvedReports}</div>
                                <div className="text-xs text-muted-foreground">Resolved</div>
                              </div>
                              <div className="text-center p-3 bg-muted rounded-lg">
                                <div className="text-lg font-bold text-primary">{department.avgResponseTime}</div>
                                <div className="text-xs text-muted-foreground">Avg Response</div>
                              </div>
                            </div>
                          </div>

                          {/* Categories */}
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Handled Categories</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {department.categories.map((category, index) => (
                                <Badge key={index} variant="outline">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-4 border-t">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit Department
                            </Button>
                            <Button size="sm" variant="outline">
                              <UserPlus className="h-4 w-4 mr-1" />
                              Manage Staff
                            </Button>
                            <Button size="sm" variant="outline">
                              <Activity className="h-4 w-4 mr-1" />
                              View Reports
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Departments;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Upload, Camera, AlertTriangle, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ReportIssue() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    location: "",
    description: "",
    photo: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Roads & Transport",
    "Street Lighting", 
    "Sanitation",
    "Parks & Environment",
    "Utilities",
    "Safety & Security",
    "Public Buildings",
    "Other"
  ];

  const priorities = ["Low", "Medium", "High", "Emergency"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in and is a regular user (not admin)
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (user.role !== "user") {
      alert("Only registered users can submit reports. Please login as a user.");
      return;
    }
    
    setIsSubmitting(true);
    
    // TODO: Connect to backend API
    setTimeout(() => {
      alert("Report submitted successfully! You'll receive updates via email.");
      setFormData({
        title: "",
        category: "",
        priority: "",
        location: "",
        description: "",
        photo: null,
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, photo: file });
  };

  const detectLocation = () => {
    // TODO: Implement geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          });
        },
        (error) => {
          alert("Unable to detect location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Report an Issue
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Help improve your community by reporting civic issues. 
            Every report makes a difference.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Login Alert for Non-Users */}
        {(!user || user.role !== "user") && (
          <Alert className="mb-8 border-primary/20 bg-primary/10">
            <LogIn className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>
                You must be logged in as a <strong>user</strong> to submit reports.
                {user?.role === "admin" && " Admins cannot submit reports directly."}
              </span>
              <Button 
                onClick={() => navigate("/login")} 
                size="sm"
                className="ml-4"
              >
                Login
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary" />
              Submit Issue Report
            </CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help us address the issue quickly and effectively.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Basic Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Brief description of the issue (e.g., 'Pothole on Main Street')"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Location Details
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Street address or description of location"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={detectLocation}
                      className="flex items-center gap-2 whitespace-nowrap"
                    >
                      <MapPin className="h-4 w-4" />
                      Auto-Detect
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Provide the exact location where the issue is located
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Issue Description
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a detailed description of the issue, including when you first noticed it, how it affects the community, and any other relevant information..."
                    rows={6}
                    required
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Photo Evidence (Optional)
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="photo"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-smooth"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {formData.photo ? (
                          <div className="flex items-center gap-2 text-primary">
                            <Camera className="w-6 h-6" />
                            <span className="text-sm font-medium">{formData.photo.name}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 10MB)</p>
                          </>
                        )}
                      </div>
                      <input
                        id="photo"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Photos help us understand the issue better and prioritize accordingly
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 shadow-civic"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      title: "",
                      category: "",
                      priority: "",
                      location: "",
                      description: "",
                      photo: null,
                    });
                  }}
                  className="flex-1"
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
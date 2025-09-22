import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, Phone, Lightbulb, Trash2, Car, TreePine, AlertTriangle, CheckCircle } from "lucide-react";

export default function Home() {
  const issueCategories = [
    {
      icon: Car,
      title: "Roads & Transport",
      description: "Potholes, traffic signals, road maintenance",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Lightbulb,
      title: "Street Lighting",
      description: "Broken lights, dark areas, electrical issues",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Trash2,
      title: "Sanitation",
      description: "Garbage collection, littering, cleanliness",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: TreePine,
      title: "Parks & Environment",
      description: "Tree maintenance, park facilities, pollution",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Phone,
      title: "Utilities",
      description: "Water supply, drainage, power outages",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: AlertTriangle,
      title: "Safety & Security",
      description: "Emergency situations, safety hazards",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const stats = [
    { label: "Reports Submitted", value: "2,847", icon: MapPin },
    { label: "Issues Resolved", value: "2,134", icon: CheckCircle },
    { label: "Average Resolution Time", value: "3.2 days", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Make Your City Better
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Report civic issues in your neighborhood and track their resolution. 
            Together, we can build a better community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-civic">
                Report an Issue
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Live Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-hero rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Issue Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Issues Can You Report?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From potholes to broken streetlights, help us keep track of issues that matter to your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {issueCategories.map((category, index) => (
              <Card key={index} className="shadow-card hover:shadow-civic transition-smooth cursor-pointer group">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${category.bgColor} rounded-lg mb-4 group-hover:scale-110 transition-smooth`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to make your voice heard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Report the Issue</h3>
              <p className="text-muted-foreground">
                Take a photo, describe the problem, and mark the location on our easy-to-use form.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">We Route It</h3>
              <p className="text-muted-foreground">
                Your report is automatically sent to the relevant city department for action.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-muted-foreground">
                Get real-time updates on the status of your report until it's resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of citizens who are already helping improve our city, one report at a time.
          </p>
          <Link to="/report">
            <Button size="lg" className="shadow-civic">
              Start Reporting Issues
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
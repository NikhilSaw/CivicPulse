import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Shield } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Users,
      title: "Community-Driven",
      description: "Built by the community, for the community. Every citizen has a voice in making their city better.",
    },
    {
      icon: Target,
      title: "Efficient Resolution",
      description: "Direct routing to relevant departments ensures issues are addressed quickly and effectively.",
    },
    {
      icon: Heart,
      title: "Transparent Process",
      description: "Track your reports from submission to resolution with full transparency at every step.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security while maintaining system reliability.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Citizen Reports",
      description: "Citizens identify and report issues using our user-friendly platform with photo uploads and location mapping.",
    },
    {
      step: "02",
      title: "Smart Routing",
      description: "Our system automatically categorizes and routes reports to the appropriate city departments for faster response.",
    },
    {
      step: "03",
      title: "Department Action",
      description: "City departments receive, review, and take action on reports while updating status in real-time.",
    },
    {
      step: "04",
      title: "Community Impact",
      description: "Resolved issues improve quality of life, and citizens receive updates throughout the entire process.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About CivicConnect
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Empowering citizens to improve their communities through technology, 
            transparency, and collaborative action.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              To bridge the gap between citizens and city services by providing a modern, 
              efficient platform for reporting and resolving civic issues. We believe that 
              every community member should have an easy way to contribute to their city's improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              How CivicConnect Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform creates a seamless connection between community members and city services, 
              ensuring every voice is heard and every issue is addressed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary-foreground">{step.step}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Making a Real Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              Together, we're building stronger, more responsive communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,847</div>
              <div className="text-muted-foreground">Total Reports</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">75%</div>
              <div className="text-muted-foreground">Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3.2</div>
              <div className="text-muted-foreground">Avg. Days to Resolve</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Vision for the Future
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We envision cities where technology serves as a bridge between government and citizens, 
            creating more responsive, efficient, and inclusive communities. Through platforms like 
            CivicConnect, we're working toward a future where every citizen can actively participate 
            in improving their neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/report" className="inline-block">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-glow transition-smooth shadow-civic">
                Start Making a Difference
              </button>
            </a>
            <a href="/contact" className="inline-block">
              <button className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-smooth">
                Get in Touch
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
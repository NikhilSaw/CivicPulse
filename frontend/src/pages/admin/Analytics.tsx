import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const Analytics = () => {
  // Mock data for charts
  const reportsByCategory = [
    { name: "Roads", count: 45, percentage: 30 },
    { name: "Lighting", count: 32, percentage: 21 },
    { name: "Sanitation", count: 28, percentage: 19 },
    { name: "Parks", count: 25, percentage: 17 },
    { name: "Safety", count: 20, percentage: 13 },
  ];

  const reportsByStatus = [
    { name: "Pending", count: 42, color: "#f59e0b" },
    { name: "In Progress", count: 35, color: "#3b82f6" },
    { name: "Resolved", count: 73, color: "#10b981" },
  ];

  const monthlyTrends = [
    { month: "Jan", total: 65, resolved: 45, pending: 20 },
    { month: "Feb", total: 78, resolved: 55, pending: 23 },
    { month: "Mar", total: 90, resolved: 68, pending: 22 },
    { month: "Apr", total: 85, resolved: 70, pending: 15 },
    { month: "May", total: 95, resolved: 80, pending: 15 },
    { month: "Jun", total: 120, resolved: 95, pending: 25 },
  ];

  const responseTime = [
    { category: "Roads", avgDays: 3.2 },
    { category: "Lighting", avgDays: 2.8 },
    { category: "Sanitation", avgDays: 1.5 },
    { category: "Parks", avgDays: 4.1 },
    { category: "Safety", avgDays: 0.8 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Insights and trends for civic issue management.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                  <p className="text-2xl font-bold text-success">68.5%</p>
                  <p className="text-xs text-muted-foreground mt-1">+2.3% from last month</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold text-primary">2.8 days</p>
                  <p className="text-xs text-muted-foreground mt-1">-0.5 days from last month</p>
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
                  <p className="text-sm font-medium text-muted-foreground">User Satisfaction</p>
                  <p className="text-2xl font-bold text-warning">87%</p>
                  <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Issues</p>
                  <p className="text-2xl font-bold text-red-600">77</p>
                  <p className="text-xs text-muted-foreground mt-1">-12 from last month</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Reports by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportsByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Report Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportsByStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={(entry: any) => {
                      const total = reportsByStatus.reduce((sum, item) => sum + item.count, 0);
                      const percent = ((entry.value / total) * 100).toFixed(0);
                      return `${entry.name}: ${percent}%`;
                    }}
                  >
                    {reportsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Monthly Report Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                  <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10b981" fill="#10b981" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Average Response Time by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseTime} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" />
                  <Tooltip formatter={(value) => [`${value} days`, 'Avg Response Time']} />
                  <Bar dataKey="avgDays" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-border rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">Best Performing</h3>
                <p className="text-sm text-muted-foreground">Safety & Security</p>
                <p className="text-xs text-muted-foreground mt-1">0.8 days avg response</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">Needs Attention</h3>
                <p className="text-sm text-muted-foreground">Parks & Environment</p>
                <p className="text-xs text-muted-foreground mt-1">4.1 days avg response</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">Trending Up</h3>
                <p className="text-sm text-muted-foreground">User Satisfaction</p>
                <p className="text-xs text-muted-foreground mt-1">+5% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
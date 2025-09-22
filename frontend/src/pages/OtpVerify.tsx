import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { MapPin, RefreshCw } from "lucide-react";

export default function OtpVerify() {
  const { verifyOtp, requestOtp } = useAuth();
  const location: any = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !otp) {
      alert("Please enter both email and OTP");
      return;
    }

    if (otp.length !== 6) {
      alert("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(email, otp);
      // Navigation is handled in the auth context
    } catch (err: any) {
      alert(err?.message || "OTP verification failed (mock)");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    setResending(true);
    try {
      await requestOtp(email);
      alert("New OTP sent to your email (mock)");
    } catch (err: any) {
      alert(err?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 gradient-hero rounded-xl flex items-center justify-center shadow-civic">
            <MapPin className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-foreground">Verify Your Email</h1>
          <p className="mt-2 text-muted-foreground">
            Enter the 6-digit OTP sent to your email
          </p>
        </div>

        {/* OTP Verification Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              Please check your email for the verification code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  required
                />
                <p className="text-xs text-muted-foreground text-center">
                  Demo OTP: <span className="font-semibold">123456</span>
                </p>
              </div>

              <Button type="submit" className="w-full shadow-civic" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                onClick={handleResendOtp}
                disabled={resending}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {resending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    Resending...
                  </>
                ) : (
                  "Didn't receive the code? Resend OTP"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Having trouble?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
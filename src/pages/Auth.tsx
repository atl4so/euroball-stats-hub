import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the current domain for the redirect URL
  const redirectTo = `${window.location.origin}/auth/callback`;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("username")
              .eq("id", session.user.id)
              .single();

            if (profileError) throw profileError;

            if (profile?.username.startsWith("user_")) {
              setShowUsernameForm(true);
            } else {
              navigate("/");
            }
          } catch (err) {
            console.error("Error checking profile:", err);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to load user profile",
            });
          }
        } else if (event === "SIGNED_OUT") {
          setError(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3) {
      toast({
        variant: "destructive",
        title: "Invalid username",
        description: "Username must be at least 3 characters long",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Username updated",
        description: "Your profile has been updated successfully.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating username",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 500:
          return "An unexpected error occurred. Please try again later.";
        case 400:
          return "Invalid email or password format.";
        default:
          return error.message;
      }
    }
    return error.message;
  };

  useEffect(() => {
    const handleAuthError = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "USER_UPDATED" && !session) {
        setError("Authentication failed. Please try again.");
      }
    });

    return () => {
      handleAuthError.data.subscription.unsubscribe();
    };
  }, []);

  if (showUsernameForm) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Choose your username</CardTitle>
            <CardDescription>
              Pick a unique username that will be visible to other users
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleUsernameSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                Continue
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome to GameSeeker</h1>
          <p className="text-muted-foreground">Sign in or create an account</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary))',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={redirectTo}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
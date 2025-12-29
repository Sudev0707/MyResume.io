import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { FileText, Upload, BarChart3, Link, Shield, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow">
                <FileText className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Share Your Resume,
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Track Every View
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create short, shareable links for your resume. Get detailed analytics on views, 
              downloads, and engagement. Professional resume sharing made simple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-glow"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth')}
                className="text-lg px-8 py-6"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Share Your Resume
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful features to help you stand out
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                <Link className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Short Links</h3>
              <p className="text-muted-foreground">
                Generate clean, memorable links for your resume. Easy to share on social media, 
                email signatures, or business cards.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-muted-foreground">
                Track views, downloads, and engagement. Know when recruiters are checking 
                out your resume with detailed analytics.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Updates</h3>
              <p className="text-muted-foreground">
                Update your resume anytime. Your short link stays the same, but viewers 
                always see your latest version.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-card p-12 rounded-2xl shadow-elegant border border-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of professionals sharing their resumes with ResumeLink
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-glow"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Your Resume Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-semibold">ResumeLink</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ResumeLink. Share smart, track better.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

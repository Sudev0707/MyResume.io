import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Eye, Download, FileText, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { toast } from 'sonner';

interface AnalyticsData {
  date: string;
  views: number;
  downloads: number;
}

interface ResumeStats {
  title: string;
  views: number;
  downloads: number;
}

const Analytics = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [totalResumes, setTotalResumes] = useState(0);
  const [chartData, setChartData] = useState<AnalyticsData[]>([]);
  const [topResumes, setTopResumes] = useState<ResumeStats[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      // Fetch resumes
      const { data: resumes, error: resumesError } = await supabase
        .from('resumes')
        .select('*');

      if (resumesError) throw resumesError;

      if (!resumes || resumes.length === 0) {
        setLoading(false);
        return;
      }

      // Calculate totals
      const views = resumes.reduce((sum, r) => sum + r.views, 0);
      const downloads = resumes.reduce((sum, r) => sum + r.downloads, 0);
      
      setTotalViews(views);
      setTotalDownloads(downloads);
      setTotalResumes(resumes.length);

      // Get top resumes
      const sorted = [...resumes]
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)
        .map(r => ({
          title: r.title,
          views: r.views,
          downloads: r.downloads,
        }));
      setTopResumes(sorted);

      // Fetch analytics data for chart (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: analytics, error: analyticsError } = await supabase
        .from('resume_analytics')
        .select('*')
        .in('resume_id', resumes.map(r => r.id))
        .gte('created_at', thirtyDaysAgo.toISOString());

      if (analyticsError) throw analyticsError;

      // Group by date
      const grouped: { [key: string]: { views: number; downloads: number } } = {};
      
      analytics?.forEach(event => {
        const date = new Date(event.created_at).toLocaleDateString();
        if (!grouped[date]) {
          grouped[date] = { views: 0, downloads: 0 };
        }
        if (event.event_type === 'view') {
          grouped[date].views++;
        } else if (event.event_type === 'download') {
          grouped[date].downloads++;
        }
      });

      const chartArray: AnalyticsData[] = Object.entries(grouped).map(([date, data]) => ({
        date,
        views: data.views,
        downloads: data.downloads,
      }));

      setChartData(chartArray);
    } catch (error: any) {
      console.error('Analytics error:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalViews}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {totalResumes} resume{totalResumes !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalDownloads}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalViews > 0 ? `${Math.round((totalDownloads / totalViews) * 100)}% conversion` : 'No views yet'}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Resumes</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalResumes}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total uploaded resumes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        {chartData.length > 0 && (
          <Card className="mb-8 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Views & Downloads (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="downloads" stroke="hsl(var(--accent))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Top Resumes */}
        {topResumes.length > 0 && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Top Performing Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topResumes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="title" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="views" fill="hsl(var(--primary))" />
                  <Bar dataKey="downloads" fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {totalResumes === 0 && (
          <Card className="p-12 text-center shadow-card">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No data yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload your first resume to start tracking analytics
            </p>
            <Button onClick={() => navigate('/dashboard')} className="bg-gradient-primary">
              Go to Dashboard
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Analytics;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ArrowLeft } from 'lucide-react';

const ResumeRedirect = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (shortId) {
      fetchAndTrackResume();
    }
  }, [shortId]);

  const fetchAndTrackResume = async () => {
    try {
      // Fetch resume by short_id
      const { data, error: fetchError } = await supabase
        .from('resumes')
        .select('*')
        .eq('short_id', shortId)
        .single();

      if (fetchError || !data) {
        setError(true);
        setLoading(false);
        return;
      }

      setResume(data);

      // Track view
      await supabase.from('resume_analytics').insert({
        resume_id: data.id,
        event_type: 'view',
        ip_address: null, // Could add IP tracking
        user_agent: navigator.userAgent,
      });

      // Increment views count
      await supabase
        .from('resumes')
        .update({ views: data.views + 1 })
        .eq('id', data.id);

      setLoading(false);

      // Auto-open PDF after 2 seconds
      setTimeout(() => {
        window.open(data.file_url, '_blank');
      }, 2000);
    } catch (error) {
      console.error('Error fetching resume:', error);
      setError(true);
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resume) return;

    // Track download
    await supabase.from('resume_analytics').insert({
      resume_id: resume.id,
      event_type: 'download',
      ip_address: null,
      user_agent: navigator.userAgent,
    });

    // Increment downloads count
    await supabase
      .from('resumes')
      .update({ downloads: resume.downloads + 1 })
      .eq('id', resume.id);

    // Open PDF
    window.open(resume.file_url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full p-8 text-center shadow-card">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Resume Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The resume link you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full p-8 text-center shadow-elegant">
        <div className="p-4 bg-gradient-primary rounded-xl shadow-glow inline-block mb-6">
          <FileText className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{resume.title}</h1>
        <p className="text-muted-foreground mb-6">
          Opening resume in a new tab...
        </p>
        <div className="space-y-3">
          <Button 
            onClick={handleDownload}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
          <p className="text-xs text-muted-foreground">
            Powered by ResumeLink
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ResumeRedirect;

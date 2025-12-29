import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Eye, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Resume {
  id: string;
  title: string;
  file_url: string;
  short_id: string;
  views: number;
  downloads: number;
  created_at: string;
}

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
}

const ResumeCard = ({ resume, onDelete }: ResumeCardProps) => {
  const shortUrl = `${window.location.origin}/r/${resume.short_id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{resume.title}</CardTitle>
        <p className="text-xs text-muted-foreground">
          {new Date(resume.created_at).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Short Link</p>
          <div className="flex items-center gap-2">
            <code className="text-sm flex-1 truncate">{shortUrl}</code>
            <Button
              size="icon"
              variant="ghost"
              onClick={copyToClipboard}
              className="h-8 w-8 shrink-0"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>{resume.views} views</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Download className="w-4 h-4" />
            <span>{resume.downloads} downloads</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => window.open(shortUrl, '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Resume</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{resume.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(resume.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;

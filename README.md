# ResumeLink

A modern, full-stack web application for uploading, sharing, and tracking resume views with short, professional links. Built with React, TypeScript, and Supabase.

![ResumeLink](https://img.shields.io/badge/ResumeLink-Professional%20Resume%20Sharing-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.80.0-3ECF8E?style=flat-square&logo=supabase)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=flat-square&logo=vite)

## 🚀 Features

- **📤 Resume Upload**: Securely upload PDF resumes with drag-and-drop interface
- **🔗 Short Links**: Generate clean, shareable links for your resume (e.g., `resumelink.app/r/abc123`)
- **📊 Real-time Analytics**: Track views, downloads, and engagement metrics
- **📈 Interactive Charts**: Visualize resume performance with detailed analytics
- **🔐 User Authentication**: Secure login/signup with Supabase Auth
- **📱 Responsive Design**: Modern UI built with ShadCN components and Tailwind CSS
- **⚡ Instant Updates**: Update your resume anytime while keeping the same link
- **🛡️ Privacy Control**: Full control over who can view your resume data

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **React Query** - Powerful data fetching and caching
- **Recharts** - Interactive charts and graphs

### Backend & Database
- **Supabase** - Backend-as-a-Service (PostgreSQL, Auth, Storage)
- **Supabase Auth** - User authentication and authorization
- **Supabase Storage** - File storage for resume uploads
- **Row Level Security (RLS)** - Database-level security policies

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **bun** package manager
- **Supabase Account** - For backend services

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resumelink.git
   cd resumelink
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Supabase Setup**
   - Create a new project on [Supabase](https://supabase.com)
   - Run the database migrations from `supabase/migrations/`
   - Configure authentication providers (optional)
   - Set up storage bucket policies

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   # or
   bun run build
   ```

## 📊 Database Schema

The application uses three main tables:

### `profiles`
User profile information linked to Supabase Auth users.

### `resumes`
Resume metadata including:
- `title` - Resume title
- `file_url` - Supabase Storage URL
- `short_id` - Unique short identifier for sharing
- `views` - Total view count
- `downloads` - Total download count

### `resume_analytics`
Tracking events for analytics:
- `event_type` - 'view' or 'download'
- `ip_address` - Visitor IP (anonymized)
- `user_agent` - Browser information
- `created_at` - Timestamp

## 🎯 Usage

### For Job Seekers

1. **Sign Up/Login**: Create an account or sign in with existing credentials
2. **Upload Resume**: Drag and drop your PDF resume or click to browse
3. **Get Shareable Link**: Copy the generated short link (e.g., `resumelink.app/r/abc123`)
4. **Share Everywhere**: Use the link in emails, LinkedIn, business cards, etc.
5. **Track Performance**: View analytics to see who's viewing your resume

### For Recruiters

1. **Click the Link**: Access resumes via short, professional links
2. **View Resume**: See the latest version instantly
3. **Download**: Save resumes for your records (tracked automatically)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   ├── ResumeCard.tsx
│   ├── ResumeUploadDialog.tsx
│   └── NavLink.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/
├── lib/                # Utility functions
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Auth.tsx        # Login/Signup
│   ├── Dashboard.tsx   # Resume management
│   ├── Analytics.tsx   # Analytics dashboard
│   ├── ResumeRedirect.tsx # Public resume viewer
│   └── NotFound.tsx    # 404 page
└── main.tsx           # App entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ShadCN](https://ui.shadcn.com/) for beautiful UI components
- [Supabase](https://supabase.com/) for the amazing backend platform
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) for the frontend framework

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ for job seekers and recruiters worldwide**

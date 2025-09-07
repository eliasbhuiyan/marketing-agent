# Marketing Agent - AI-Powered Marketing Platform

A comprehensive marketing platform that combines AI-powered design tools, content creation, trend analysis, and social media management in one powerful application.

## 🚀 Features

### 1. Marketing Poster & Product Image Module
- **Poster & Banner Maker**: AI-powered design generation with brand customization
- **Background Remover**: Clean transparent backgrounds with lifestyle replacements
- **Template Marketplace**: Pre-made templates for various occasions and industries
- **AI Caption Writer**: Auto-generate captions matching poster tone
- **Social Media Scheduler**: Schedule posts across all major platforms

### 2. Content & Copywriting Module
- **SEO-friendly Caption/Content Writer**: Generate engaging social media content
- **SEO Blog Writer**: Create and schedule blogs with WordPress/Medium integration
- **Email Marketing Writer**: Generate newsletters, subject lines, and CTAs
- **Hashtag & Keyword Generator**: AI-powered hashtag and SEO keyword suggestions
- **Export Integration**: Direct export to Mailchimp, Brevo, and other platforms

### 3. Trend Analyzer Agent Module
- **Trend Monitoring**: Real-time tracking across Google, TikTok, Instagram, Twitter/X
- **Content Suggestions**: AI-powered post ideas based on current trends
- **Hashtag Recommender**: Trending and niche hashtag suggestions for higher reach
- **Performance Analytics**: Track engagement and reach metrics

### 4. YouTube Marketing Module
- **Thumbnail Maker**: AI-generated YouTube thumbnails with multiple variations
- **Script Writer**: Generate engaging video scripts for short and long-form content
- **Content Ideas Generator**: Trending YouTube content suggestions
- **Brand Integration**: Customize thumbnails with brand colors and style

### 5. Social Media Management
- **Multi-Platform Scheduling**: Facebook, Instagram, LinkedIn, TikTok, Twitter/X
- **Calendar View**: Drag-and-drop scheduling interface
- **Analytics Dashboard**: Track performance across all platforms
- **Team Collaboration**: Multi-user access with role-based permissions

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks and context

## 📁 Project Structure

```
app/
├── (main)/                 # Public pages
│   ├── layout.js          # Main layout
│   ├── page.js            # Landing page
│   └── landing-page.js    # Landing page component
├── (auth)/                # Authentication pages
│   ├── layout.js          # Auth layout
│   ├── login/page.js      # Login page
│   └── register/page.js   # Registration page
├── (dashboard)/           # Dashboard pages
│   ├── layout.js          # Dashboard layout with sidebar
│   ├── page.js            # Dashboard home
│   ├── posters/page.js    # Poster & design creator
│   ├── content/page.js    # Content & copywriting
│   ├── trends/page.js     # Trend analyzer
│   ├── youtube/page.js    # YouTube marketing
│   ├── scheduler/page.js  # Social media scheduler
│   ├── templates/page.js  # Template marketplace
│   └── settings/page.js   # Settings & integrations
├── globals.css            # Global styles
└── layout.js              # Root layout

components/
└── ui/                    # Reusable UI components
    ├── button.js
    ├── card.js
    ├── input.js
    └── label.js

lib/
└── utils.js               # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd marketing-agent
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark/Light Mode**: Theme switching capability
- **Component-Based Architecture**: Reusable and maintainable components
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Keys (when implementing backend)
NEXT_PUBLIC_API_URL=http://localhost:3001
OPENAI_API_KEY=your_openai_key
SOCIAL_MEDIA_API_KEYS=your_social_media_keys

# Database (when implementing backend)
DATABASE_URL=your_database_url
```

### Customization
- **Brand Colors**: Update color palette in `app/globals.css`
- **Fonts**: Modify font imports in `app/layout.js`
- **Components**: Customize UI components in `components/ui/`

## 📱 Supported Platforms

- **Social Media**: Facebook, Instagram, LinkedIn, TikTok, Twitter/X
- **Content Platforms**: WordPress, Medium, YouTube
- **Email Marketing**: Mailchimp, Brevo
- **Analytics**: Google Analytics, Facebook Insights

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms
- **Netlify**: Connect GitHub repository
- **Railway**: Deploy with Railway CLI
- **Docker**: Use provided Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@marketingagent.com
- Documentation: [docs.marketingagent.com](https://docs.marketingagent.com)

## 🔮 Roadmap

- [ ] AI-powered video generation
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] White-label solutions
- [ ] Advanced team collaboration features

---

Built with ❤️ using Next.js and modern web technologies.
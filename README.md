# GDG VIT Mumbai - Core Team Recruitment Portal 2025-26

A modern, responsive recruitment portal for GDG VIT Mumbai Core Team selection, built with Next.js 14, TypeScript, and Tailwind CSS. Features domain-specific applications with Round 1 questions and Google Sheets integration.

## 🚀 Features

- **Modern Landing Page** with countdown timer and GDG branding
- **Domain Selection** - Students can choose up to 2 domains from 8 available options:
  - Android Development
  - Web Development
  - Machine Learning & AI
  - Cloud Computing
  - UI/UX Design
  - Marketing & Social Media
  - Event Management
  - Community Management
- **Dynamic Round 1 Questions** - Domain-specific questions appear based on selected domains
- **Google Sheets Integration** - Form submissions are automatically stored in Google Sheets
- **Responsive Design** - Works perfectly on all devices
- **Form Validation** - Client-side and server-side validation
- **Real-time Countdown** - Shows time remaining for applications

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form
- **Icons:** Lucide React
- **Backend:** Google Sheets API
- **Deployment:** Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Google Cloud Project (for Sheets integration)
- Google Sheet for storing form data

## 🚀 Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd gdg-vit-mumbai-portal
   npm install
   ```

2. **Set up Google Sheets Integration:**
   
   a. Create a Google Cloud Project:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one
   
   b. Enable Google Sheets API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API" and enable it
   
   c. Create Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Download the JSON key file
   
   d. Create Google Sheet:
   - Create a new Google Sheet
   - Share it with the service account email (give Editor access)
   - Copy the Sheet ID from the URL

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the values in `.env.local`:
   ```env
   GOOGLE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your-google-sheet-id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** to see your portal!

## 📊 Google Sheet Setup

Your Google Sheet should have the following columns (Header row):

| Timestamp | Name | Email | Phone | Roll Number | Branch | Year | Primary Domain | Secondary Domain | Why GDG | Experience | Portfolio | Domain Questions... |
|-----------|------|-------|-------|-------------|---------|------|----------------|------------------|---------|------------|-----------|-------------------|

The domain-specific questions will be added as additional columns automatically.

## 🎨 Customization

### Update Recruitment Deadline
Edit the countdown timer in `src/app/page.tsx`:
```typescript
const targetDate = new Date('2025-01-15T23:59:59').getTime();
```

### Modify Domains
Update the domains array in `src/app/apply/page.tsx` and `src/app/domains/page.tsx`:
```typescript
const domains = [
  { id: 'your-domain', name: 'Your Domain Name' },
  // ... add your domains
];
```

### Add Domain-Specific Questions
Update the `domainQuestions` object in `src/app/apply/page.tsx`:
```typescript
const domainQuestions = {
  'your-domain': [
    { id: 'domain_q1', question: 'Your question here?' },
    // ... add questions
  ]
};
```

### Styling
- Colors: Edit Tailwind classes throughout components
- Fonts: Update `src/app/layout.tsx`
- Theme: Modify gradient colors in components

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy on Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 📁 Project Structure

```
src/
├── app/
│   ├── api/submit/          # Google Sheets API endpoint
│   ├── apply/               # Application form page
│   ├── domains/             # Domains showcase page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # Reusable components (if any)
└── lib/                     # Utility functions (if any)
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new pages in `src/app/`
2. Add components in `src/components/`
3. Update navigation links in existing pages
4. Test form submissions with Google Sheets

## 📝 Form Data Structure

The form captures:
- **Personal Info:** Name, Email, Phone, Roll Number, Branch, Year
- **Domain Selection:** Primary (required) and Secondary (optional)
- **General Questions:** Why GDG, Experience, Portfolio
- **Domain-Specific Questions:** Dynamic based on selected domains

## 🔒 Security

- Form validation on both client and server
- Environment variables for sensitive data
- Google Sheets API with service account authentication
- Input sanitization and error handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](../../issues) section
2. Review the Google Sheets API setup
3. Verify environment variables
4. Check browser console for errors

## 🌟 Acknowledgments

- Inspired by the original GDG REC Portal
- Built for GDG VIT Mumbai Community
- Designed for seamless recruitment experience

---

**Made with ❤️ for GDG VIT Mumbai**
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, Check, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  branch: string;
  year: string;
  primaryDomain: string;
  secondaryDomain: string;
  whyGDG: string;
  experience: string;
  portfolio: string;
  // Domain-specific questions will be added dynamically
  [key: string]: string;
}

const domains = [
  { id: 'tech', name: 'Tech' },
  { id: 'open-source', name: 'Open-Source' },
  { id: 'management', name: 'Management' },
  { id: 'design-ui-ux', name: 'Design & UI/UX' },
  { id: 'finance', name: 'Finance' },
  { id: 'media', name: 'Media' },
  { id: 'outreach', name: 'Outreach' },
  { id: 'docs', name: 'Docs' }
];

const branches = [
  'CMPN',
  'INFT',
  'EXCS',
  'EXTC',
  'BIOMED',
  'VIIE/Other'
];

const domainQuestions = {
  tech: [
    { id: 'tech_q1', question: 'What programming languages and technologies are you proficient in? Include any projects you\'ve worked on.' },
    { id: 'tech_q2', question: 'Describe a technical project you\'re most proud of. What challenges did you face and how did you solve them?' },
    { id: 'tech_q3', question: 'How do you stay updated with the latest technologies and trends in the tech industry?' }
  ],
  'open-source': [
    { id: 'opensource_q1', question: 'What open-source contributions have you made? Include your GitHub profile or specific projects.' },
    { id: 'opensource_q2', question: 'How do you approach contributing to a new open-source project?' },
    { id: 'opensource_q3', question: 'How would you encourage other students to start contributing to open-source projects?' }
  ],
  management: [
    { id: 'management_q1', question: 'What leadership or management experience do you have? (Teams, events, projects, etc.)' },
    { id: 'management_q2', question: 'How do you handle conflicts and ensure smooth collaboration in a team?' },
    { id: 'management_q3', question: 'Describe your approach to planning and executing a large-scale tech event or project.' }
  ],
  'design-ui-ux': [
    { id: 'designuiux_q1', question: 'What design work have you created? Include your portfolio with UI/UX designs, posters, or branding materials.' },
    { id: 'designuiux_q2', question: 'Which design tools are you proficient in? (Figma, Adobe Creative Suite, Canva, etc.)' },
    { id: 'designuiux_q3', question: 'Walk us through your design process from problem identification to final solution.' }
  ],
  finance: [
    { id: 'finance_q1', question: 'What experience do you have with financial planning, budgeting, or managing funds for events/organizations?' },
    { id: 'finance_q2', question: 'How would you approach creating and managing a budget for a tech event or workshop?' },
    { id: 'finance_q3', question: 'Describe your experience with sponsorship management or fundraising activities.' }
  ],
  media: [
    { id: 'media_q1', question: 'What social media content have you created? Include links to your work or social profiles.' },
    { id: 'media_q2', question: 'Which social media platforms are you most experienced with and what type of content performs best?' },
    { id: 'media_q3', question: 'How would you create a media strategy to promote GDG VIT Mumbai and increase engagement?' }
  ],
  outreach: [
    { id: 'outreach_q1', question: 'What experience do you have in building partnerships, networking, or community outreach?' },
    { id: 'outreach_q2', question: 'How would you approach reaching out to potential sponsors or collaborators for GDG events?' },
    { id: 'outreach_q3', question: 'Describe a time when you successfully built a meaningful connection or partnership.' }
  ],
  docs: [
    { id: 'docs_q1', question: 'What experience do you have in creating documentation, technical writing, or content creation?' },
    { id: 'docs_q2', question: 'How do you ensure documentation is clear, comprehensive, and accessible to different audiences?' },
    { id: 'docs_q3', question: 'Describe a time when you created documentation that significantly helped others learn or understand a concept.' }
  ]
};

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm<FormData>();

  // Check authentication and pre-fill email
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    
    if (!isAuthenticated || !email) {
      router.push('/login?redirect=/apply');
      return;
    }
    
    setUserEmail(email);
    setValue('email', email);
  }, [router, setValue]);

  const primaryDomain = watch('primaryDomain');
  const secondaryDomain = watch('secondaryDomain');

  const getQuestionsForDomains = () => {
    const questions = [];
    if (primaryDomain && domainQuestions[primaryDomain as keyof typeof domainQuestions]) {
      questions.push(...domainQuestions[primaryDomain as keyof typeof domainQuestions]);
    }
    if (secondaryDomain && secondaryDomain !== primaryDomain && domainQuestions[secondaryDomain as keyof typeof domainQuestions]) {
      questions.push(...domainQuestions[secondaryDomain as keyof typeof domainQuestions]);
    }
    return questions;
  };

  const submitToGoogleSheets = async (data: FormData) => {
    const formattedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      rollNumber: data.rollNumber,
      branch: data.branch,
      year: data.year,
      primaryDomain: domains.find(d => d.id === data.primaryDomain)?.name || '',
      secondaryDomain: domains.find(d => d.id === data.secondaryDomain)?.name || '',
      whyGDG: data.whyGDG,
      experience: data.experience,
      portfolio: data.portfolio,
      ...Object.keys(data).filter(key => key.includes('_q')).reduce((acc, key) => ({
        ...acc,
        [key]: data[key]
      }), {})
    };

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit application');
    }

    return response.json();
  };

  const onSubmit = async (data: FormData) => {
    if (!data.primaryDomain) {
      setError('Please select at least one domain');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await submitToGoogleSheets(data);
      setIsSubmitted(true);
      reset();
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for applying to GDG VIT Mumbai. We'll review your application and get back to you soon.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <button
            onClick={() => {
              localStorage.removeItem('userEmail');
              localStorage.removeItem('isAuthenticated');
              router.push('/login');
            }}
            className="text-gray-400 hover:text-red-400 transition-colors text-sm"
          >
            Logout ({userEmail})
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Apply for GDG VIT Mumbai
          </h1>
          <p className="text-gray-300 text-lg">Core Team Recruitment 2025-26</p>
          <p className="text-gray-400 text-sm mt-2">Note: Please use your official VIT email address for application</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@vit\.edu\.in$/i,
                      message: 'Please use your official VIT email address (@vit.edu.in)'
                    }
                  })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-500 rounded-lg text-white cursor-not-allowed"
                  placeholder="your.email@vit.edu.in"
                  value={userEmail}
                  disabled
                  readOnly
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 12345 67890"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Roll Number *
                </label>
                <input
                  {...register('rollNumber', { required: 'Roll number is required' })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your roll number"
                />
                {errors.rollNumber && <p className="text-red-400 text-sm mt-1">{errors.rollNumber.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Branch *
                </label>
                <select
                  {...register('branch', { required: 'Branch is required' })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                {errors.branch && <p className="text-red-400 text-sm mt-1">{errors.branch.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Year of Study *
                </label>
                <select
                  {...register('year', { required: 'Year is required' })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>}
              </div>
            </div>
          </div>

          {/* Domain Selection */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Domain Selection</h2>
            <p className="text-gray-300 mb-6">Choose up to 2 domains that align with your interests and skills.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Primary Domain * (Required)
                </label>
                <select
                  {...register('primaryDomain', { required: 'Primary domain is required' })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select primary domain</option>
                  {domains.map((domain) => (
                    <option key={domain.id} value={domain.id}>{domain.name}</option>
                  ))}
                </select>
                {errors.primaryDomain && <p className="text-red-400 text-sm mt-1">{errors.primaryDomain.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Secondary Domain (Optional)
                </label>
                <select
                  {...register('secondaryDomain')}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select secondary domain</option>
                  {domains.filter(domain => domain.id !== primaryDomain).map((domain) => (
                    <option key={domain.id} value={domain.id}>{domain.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* General Questions */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">General Questions</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Why do you want to join GDG VIT Mumbai? *
                </label>
                <textarea
                  {...register('whyGDG', { required: 'This field is required' })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your motivation and what you hope to contribute..."
                />
                {errors.whyGDG && <p className="text-red-400 text-sm mt-1">{errors.whyGDG.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Describe your relevant experience and skills *
                </label>
                <textarea
                  {...register('experience', { required: 'This field is required' })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your technical skills, projects, internships, or any relevant experience..."
                />
                {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Portfolio/GitHub/LinkedIn Links (Optional)
                </label>
                <textarea
                  {...register('portfolio')}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share links to your portfolio, GitHub, LinkedIn, or any relevant work..."
                />
              </div>
            </div>
          </div>

          {/* Domain-Specific Questions */}
          {getQuestionsForDomains().length > 0 && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-white">Domain-Specific Questions</h2>
              <div className="space-y-6">
                {getQuestionsForDomains().map((question, index) => (
                  <div key={question.id}>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      {index + 1}. {question.question} *
                    </label>
                    <textarea
                      {...register(question.id, { required: 'This field is required' })}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share your detailed response..."
                    />
                    {errors[question.id] && <p className="text-red-400 text-sm mt-1">This field is required</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-8 rounded-full transition-colors inline-flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application <Send className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
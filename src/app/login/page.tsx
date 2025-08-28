'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Lock, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/apply'
  const department = searchParams.get('department') || ''

  const validateVITEmail = (email: string): boolean => {
    const vitEmailRegex = /^[a-zA-Z0-9._%+-]+@vit\.edu\.in$/
    return vitEmailRegex.test(email)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!validateVITEmail(email)) {
      setError('Please use your official VIT email address (@vit.edu.in)')
      return
    }

    setIsLoading(true)

    try {
      // Store email in localStorage for the application form
      localStorage.setItem('userEmail', email)
      localStorage.setItem('isAuthenticated', 'true')
      
      // Add department to redirect if present
      const redirectUrl = department ? `${redirect}?department=${department}` : redirect
      
      // Simulate login delay
      setTimeout(() => {
        router.push(redirectUrl)
      }, 1000)
      
    } catch (err) {
      setError('Login failed. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <main className="bg-[#121212] min-h-screen relative">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/domains" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Domains
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <img 
                alt="gdg" 
                width="48" 
                height="48" 
                className="rounded-full mx-auto mb-4" 
                src="/assets/gdg.svg"
              />
              <h1 className="text-2xl font-bold text-white mb-2">
                Login to Continue
              </h1>
              <p className="text-gray-400 text-sm">
                Use your official VIT email address to proceed
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6 flex items-center"
              >
                <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                <span className="text-red-400 text-sm">{error}</span>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  VIT Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your.name@vit.edu.in"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Only @vit.edu.in email addresses are accepted
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Continue to Application
                    <Lock className="ml-2 w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <strong>Note:</strong> This is a simple email verification. You can select up to 2 domains during the application process.
              </p>
            </div>
          </motion.div>

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Having trouble? Contact us at{' '}
              <a 
                href="mailto:gdgvitmumbai@gmail.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                gdgvitmumbai@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
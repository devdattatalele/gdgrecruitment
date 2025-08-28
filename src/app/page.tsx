'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface FloatingCard {
  id: string
  text: string
  color: string
  position: { top: string, left?: string, right?: string, bottom?: string }
  rotation: string
  shadow: string
}

export default function HomePage() {
  const [showModal, setShowModal] = useState(true)

  const floatingCards: FloatingCard[] = [
    {
      id: 'google-initiative',
      text: 'A Google Initiative',
      color: 'bg-yellow-500',
      position: { top: '20%', left: '10%' },
      rotation: '-rotate-12',
      shadow: 'rgba(251, 191, 36, 0.4) 0px 20px 25px -5px, rgba(251, 191, 36, 0.04) 0px 10px 10px -5px'
    },
    {
      id: 'teams-projects',
      text: '8 Domains, Real Projects, Endless Innovation',
      color: 'bg-green-500',
      position: { top: '25%', right: '10%' },
      rotation: 'rotate-12',
      shadow: 'rgba(34, 197, 94, 0.4) 0px 20px 25px -5px, rgba(34, 197, 94, 0.04) 0px 10px 10px -5px'
    },
    {
      id: 'passionate-developers',
      text: '200+ Passionate Developers',
      color: 'bg-sky-400',
      position: { bottom: '25%', left: '15%' },
      rotation: 'rotate-6',
      shadow: 'rgba(56, 189, 248, 0.4) 0px 20px 25px -5px, rgba(56, 189, 248, 0.04) 0px 10px 10px -5px'
    },
    {
      id: 'opportunities',
      text: 'Opportunities to Lead and Innovate',
      color: 'bg-red-500',
      position: { bottom: '20%', right: '15%' },
      rotation: '-rotate-6',
      shadow: 'rgba(239, 68, 68, 0.4) 0px 20px 25px -5px, rgba(239, 68, 68, 0.04) 0px 10px 10px -5px'
    }
  ]

  const mobileCards = [
    { icon: '📁', text: 'A Google Initiative', color: 'bg-yellow-500' },
    { icon: '📅', text: '8 Domains, Real Projects, Endless Innovation', color: 'bg-green-500' },
    { icon: '👥', text: '200+ Passionate Developers', color: 'bg-sky-400' },
    { icon: '🚀', text: 'Opportunities to Lead and Innovate', color: 'bg-red-500' }
  ]

  return (
    <>
      {/* Authentication Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Authentication Notice</h2>
                <p className="text-sm text-gray-400">This information is crucial for setting up your account.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-blue-400 mt-0.5">→</span>
                <p>Please make sure you are signing in using your official VIT email address, as other email IDs will not be accepted.</p>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-blue-400 mt-0.5">→</span>
                <p>You can only apply to two departments.</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-colors"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}

      <main className="bg-[#121212] min-h-screen relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        
        {/* Gradient Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        {/* Floating Cards - Desktop */}
        <div className="hidden lg:block">
          {floatingCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`absolute ${card.rotation} hover:scale-110 transition-transform cursor-pointer float-animation`}
              style={{ 
                top: card.position.top, 
                left: card.position.left,
                right: card.position.right,
                bottom: card.position.bottom,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <div className="relative">
                <div 
                  className={`${card.color} rounded-2xl px-6 py-4 shadow-2xl relative z-10 max-w-xs`}
                  style={{ boxShadow: card.shadow }}
                >
                  <span className="text-white font-semibold text-sm">{card.text}</span>
                </div>
                <div className={`absolute inset-0 ${card.color} rounded-2xl blur-xl opacity-20 -z-10`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-wrap justify-center gap-4 lg:hidden mt-8 px-4">
          {mobileCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative overflow-visible"
            >
              <div 
                className={`${card.color} rounded-xl px-4 py-3 shadow-2xl relative z-10 max-w-xs`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{card.icon}</span>
                  <span className="text-white font-medium text-sm">{card.text}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 max-w-3xl mx-auto mt-10"
          >
            <h1 className="text-white leading-none font-extrabold text-4xl sm:text-5xl lg:text-6xl">
              Ready to Make Your Mark?
            </h1>
            
            <p className="text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl lg:text-2xl font-light">
              Innovate with us — your journey starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-8">
              <Link href="/domains">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-12 py-4 rounded-full transition-all duration-300 shadow-2xl"
                >
                  View Domains
                </motion.button>
              </Link>
              
              <Link href="https://docs.google.com/document/d/your-faq-doc-id/edit" target="_blank">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold text-lg px-12 py-4 rounded-full transition-all duration-300 shadow-2xl"
                >
                  FAQs
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-[#121212] border-t border-gray-700">
          <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center px-10 py-8">
            <p className="text-xl text-white text-center sm:text-left">
              Google Developer Groups on Campus VIT Mumbai
            </p>
            
            <div className="flex justify-center items-center gap-5 mb-5 sm:mb-0">
              {/* Social Media Links */}
              <a href="https://www.instagram.com/gdg.vitmumbai/" target="_blank" className="text-gray-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a href="mailto:gdgvitmumbai@gmail.com" className="text-gray-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636C.732 21.003 0 20.271 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819c.904 0 1.636.732 1.636 1.636z"/>
                </svg>
              </a>
              
              <a href="https://www.linkedin.com/company/gdgvitmumbai" target="_blank" className="text-gray-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
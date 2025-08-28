'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Department {
  id: string
  name: string
  icon: string
  description: string
  color: string
  height: number
}

const departments: Department[] = [
  {
    id: 'tech',
    name: 'Tech',
    icon: '/assets/icons/tech.svg',
    description: 'Build innovative applications, websites, and digital solutions using cutting-edge technologies. Work on real-world projects and contribute to the tech ecosystem at GDG VIT Mumbai.',
    color: 'rgb(66, 133, 244)',
    height: 320
  },
  {
    id: 'open-source',
    name: 'Open-Source',
    icon: '/assets/icons/open-source.svg',
    description: 'Contribute to global open-source projects, build collaboration skills, and foster a culture of transparency and learning. Help others get started with open-source contributions.',
    color: 'rgb(15, 157, 88)',
    height: 320
  },
  {
    id: 'management',
    name: 'Management',
    icon: '/assets/icons/management.svg',
    description: 'Lead teams, coordinate events, and manage operations. Turn vision into reality by planning, executing, and ensuring smooth functioning of GDG activities and growth.',
    color: 'rgb(251, 188, 4)',
    height: 320
  },
  {
    id: 'design-ui-ux',
    name: 'Design & UI/UX',
    icon: '/assets/icons/design-ui-ux.svg',
    description: 'Create visually appealing designs, intuitive user interfaces, and exceptional user experiences. Design posters, websites, and digital products that engage our community.',
    color: 'rgb(234, 67, 53)',
    height: 320
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '/assets/icons/finance.svg',
    description: 'Manage budgets, handle sponsorships, and oversee financial planning for events and operations. Ensure sustainable growth and resource optimization for the community.',
    color: 'rgb(15, 157, 88)',
    height: 320
  },
  {
    id: 'media',
    name: 'Media',
    icon: '/assets/icons/media.svg',
    description: 'Create engaging content, manage social media presence, and tell our story. Drive online engagement, promote events, and showcase the vibrant GDG community.',
    color: 'rgb(234, 67, 53)',
    height: 320
  },
  {
    id: 'outreach',
    name: 'Outreach',
    icon: '/assets/icons/outreach.svg',
    description: 'Build partnerships, expand our reach, and connect with communities and sponsors. Foster meaningful collaborations both within and beyond the campus.',
    color: 'rgb(66, 133, 244)',
    height: 320
  },
  {
    id: 'docs',
    name: 'Docs',
    icon: '/assets/icons/docs.svg',
    description: 'Create comprehensive documentation, maintain knowledge bases, and ensure information accessibility. Help build resources that enable community growth and learning.',
    color: 'rgb(251, 188, 4)',
    height: 320
  }
]


export default function DomainsPage() {
  return (
    <main className="bg-[#121212] min-h-screen relative">
      {/* Grid Background */}
      <img 
        className="absolute w-full" 
        src="/assets/images/bg_grids.svg" 
        alt=""
        style={{ color: 'transparent' }}
      />
      
      <div className="p-5 sm:px-10 relative z-10">
        {/* Back Button */}
        <div className="mb-8 pt-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* All Departments */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg text-white font-bold tracking-wider text-center text-3xl md:text-5xl py-8 px-5"
        >
          Choose Your Domain
        </motion.h1>
        
        <p className="text-center text-gray-300 text-lg mb-8 px-4">
          Select up to 2 domains that align with your interests and skills
        </p>

        <div className="my-8 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link 
                href={`/login?redirect=/apply&department=${dept.id}`}
                className="block transition-transform hover:scale-105"
              >
                <div 
                  className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer"
                  style={{ 
                    background: dept.color,
                    height: `${dept.height}px`
                  }}
                >
                  <img 
                    src={dept.icon}
                    className="h-3/5 absolute right-0 top-0 opacity-80"
                    alt={`${dept.name} icon`}
                  />
                  <div className="relative z-10">
                    <h2 className="text-2xl text-white font-semibold mb-4">
                      {dept.name}
                    </h2>
                    <p className="text-white text-base leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-[#121212] border-t border-gray-700">
          <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center px-10 py-8">
            <p className="text-xl text-white text-center sm:text-left">
              Google Developer Groups on Campus VIT Mumbai
            </p>
            
            <div className="flex justify-center items-center gap-5 mb-5 sm:mb-0">
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
      </div>
    </main>
  )
}
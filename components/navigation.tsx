'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'

export default function Navigation() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set deadline - adjust this date as needed
    const deadline = new Date('2025-01-15T23:59:59').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const timeDiff = deadline - now

      if (timeDiff > 0) {
        setTimeLeft({
          days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
        })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => String(time).padStart(2, '0')

  return (
    <div className="sticky top-0 z-50 px-5 py-3">
      <div className="px-5 py-4 bg-[rgba(80,80,80,0.2)] w-full flex backdrop-blur justify-between items-center rounded-lg">
        <Link href="/" className="flex justify-between items-center gap-2 text-white">
          <img 
            alt="gdg" 
            width="40" 
            height="40" 
            className="rounded-full" 
            src="/assets/gdg.svg"
          />
          <p className="tracking-tight hidden sm:block">
            Google Developer Groups on Campus VIT Mumbai | Recruitment Portal
          </p>
          <p className="tracking-wide visible sm:hidden">
            Recruitment Portal
          </p>
        </Link>
        
        <div className="flex gap-3 justify-center items-center">
          {/* Countdown Timer - Hidden on mobile */}
          <div className="mr-5 max-lg:hidden">
            <div className="flex flex-col items-center justify-center">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="font-bold text-white tracking-wider">
                    {formatTime(timeLeft.days)}
                  </div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wide">Days</div>
                </div>
                <div className="flex items-center text-2xl text-gray-500 font-bold">:</div>
                <div className="flex flex-col items-center">
                  <div className="font-bold text-white tracking-wider">
                    {formatTime(timeLeft.hours)}
                  </div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wide">Hours</div>
                </div>
                <div className="flex items-center text-2xl text-gray-500 font-bold">:</div>
                <div className="flex flex-col items-center">
                  <div className="font-bold text-white tracking-wider">
                    {formatTime(timeLeft.minutes)}
                  </div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wide">Minutes</div>
                </div>
                <div className="flex items-center text-2xl text-gray-500 font-bold">:</div>
                <div className="flex flex-col items-center">
                  <div className="font-bold text-white tracking-wider">
                    {formatTime(timeLeft.seconds)}
                  </div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wide">Seconds</div>
                </div>
              </div>
            </div>
          </div>
          
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
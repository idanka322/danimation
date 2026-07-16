'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { Linkedin, Github } from '@/assets/svg'
import {quickLinks, socialLinks} from "@/constants";

// Staggered motion variants for the columns
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 14 },
  },
}

export function ArchitecturalCoda() {
  const date = new Date().getFullYear()

  return (
    <motion.footer
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1 }}
      className='relative w-full overflow-hidden bg-black/50 py-6 sm:py-16 lg:py-24 pb-10 backdrop-blur-md'
    >
      {/* Visual Separator: Subtle Gradient Wave */}
      <div className='absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent' />

      <div className='mx-auto max-w-6xl p-6'>
        {/* Main Grid Section */}
        <motion.div
          variants={containerVariants}
          className='mb-10 grid grid-cols-2 gap-10 pb-10 lg:grid-cols-3'
        >
          {/* Column 1: Signature & Brand */}
          <motion.div variants={itemVariants} className='col-span-2 space-y-4 lg:col-span-1'>
            <p className='text-sm text-gray-400'>
              <strong>Staff Frontend Engineer</strong>. Focused on <strong>system design</strong>,
              measurable <strong>engineering clarity</strong>, and{' '}
              <strong>high-impact features</strong>.
            </p>
            <p className='text-xs text-gray-600'>&copy; 2024–{date}</p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className='mb-4 text-lg font-bold text-white'>Site Navigation</h4>
            <ul className='space-y-3'>
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-400 transition-colors hover:text-cyan-400'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Professional Links */}
          <motion.div variants={itemVariants}>
            <h4 className='mb-4 text-xl font-bold text-white'>Professional Presence</h4>
            <ul className='space-y-4'>
              {socialLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.target}
                    rel='noopener noreferrer'
                    className='group inline-flex items-center space-x-3 text-base font-medium text-gray-300 transition-colors hover:text-purple-400'
                  >
                    <link.icon
                      className='h-5 w-5 text-gray-500 transition-colors duration-200 group-hover:text-purple-400 flex items-center mr-2'
                      aria-hidden='true'
                    />
                    <span className='transition-transform duration-200 group-hover:translate-x-0.5'>
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

'use client'

import { type MouseEvent, useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import { Button } from '@/ui/components'
import { ArrowDownCircle, Coffee, Download, MoveRight } from 'lucide-react'
import { CALENDLY_LINK, RESUME_LINK } from '@/constants'
import Image from 'next/image'
import { trackGAEvent } from '@/helpers'

const PROFILE_IMAGE_URL = '/images/profile.webp' // <-- Placeholder URL

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for the spotlight to reduce jitter
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  function handleCalendlyClick() {
    trackGAEvent('click', 'conversion', 'book_coffee_calendly')
    window.open(CALENDLY_LINK, '_blank')
  }

  function handleDownloadClick() {
    trackGAEvent('download', 'conversion', 'resume_download')
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className='relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-black pt-20'
    >
      <BackgroundGrid x={x} y={y} />

      <div className='relative z-10 container mx-auto px-4'>
        {/* New: Flex container for Content and Image */}
        <div className='flex items-center justify-between'>
          {/* Content Column (Left Side) */}
          <div className='flex max-w-4xl flex-col gap-8'>
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <StatusBadge />
            </motion.div>

            {/* Main Headline */}
            <div className='space-y-4'>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className='text-foreground text-5xl leading-[1.1] font-bold tracking-tight sm:text-7xl md:text-8xl'
              >
                Architecting <br />
                <span className='from-primary bg-gradient-to-r via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                  Next-Gen Web.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className='text-muted-foreground max-w-2xl text-xl leading-relaxed font-light text-balance md:text-2xl'
              >
                I’m a Staff Frontend Engineer obsessed with performance, design
                systems, and building applications that feel
                <span className='text-foreground font-medium'> instant</span>.
              </motion.p>
            </div>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className='flex flex-wrap items-center gap-4'
            >
              <Button
                size='lg'
                className='bg-foreground text-background hover:bg-foreground/90 group relative h-12 overflow-hidden rounded-full px-8 text-base shadow-lg transition-all hover:scale-105'
                onClick={handleCalendlyClick}
              >
                <span className='relative z-10 flex items-center gap-2'>
                  <Coffee className='h-4 w-4' />
                  Book a Coffee
                </span>
                {/* Button Shimmer Effect */}
                <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full' />
              </Button>

              <Button
                variant='outline'
                size='lg'
                className='group h-12 rounded-full border-white/10 bg-white/5 px-6 text-base backdrop-blur-sm transition-colors hover:bg-white/10'
                asChild
                onClick={handleDownloadClick}
              >
                <a href={RESUME_LINK} download>
                  <Download className='mr-2 h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100' />
                  Resume
                </a>
              </Button>

              <Button
                variant='ghost'
                className='group text-muted-foreground hover:text-foreground ml-2'
                asChild
              >
                <a href='#work'>
                  View Work
                  <MoveRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </a>
              </Button>
            </motion.div>

            {/* Social Proof / Tech Scroller Placeholder - Subtle Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className='absolute -bottom-32 left-0 hidden md:block'
            >
              <div className='flex items-center gap-2 text-xs font-medium tracking-widest text-white/20 uppercase'>
                <ArrowDownCircle className='h-4 w-4 animate-bounce' />
                Scroll for Impact
              </div>
            </motion.div>
          </div>
        </div>{' '}
      </div>
    </section>
  )
}

function ImagePlaceholder() {
  return (
    <div className='relative h-[300px] w-[300px] xl:h-[400px] xl:w-[400px]'>
      <div className='absolute inset-0 overflow-hidden rounded-3xl border border-white/10 [box-shadow:0_0_50px_rgba(14,165,233,0.1),_0_0_100px_rgba(147,51,234,0.1)] transition-all duration-500 hover:scale-[1.02]'>
        <div className='h-full w-full bg-gray-800/50 bg-cover bg-center'>
          <Image src={PROFILE_IMAGE_URL} alt='profile picture' layout='fill' objectFit='cover' />
        </div>
      </div>
    </div>
  )
}

/**
 * Background Grid with Mouse-following Spotlight
 * Uses CSS masking and radial gradients for high performance.
 */
function BackgroundGrid({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      350px circle at ${x}px ${y}px,
      rgba(14, 165, 233, 0.15),
      transparent 80%
    )
  `

  return (
    <div className='absolute inset-0 -z-0 overflow-hidden'>
      {/* Base Grid */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]' />

      {/* Mouse Spotlight Layer */}
      <motion.div
        className='absolute inset-0 opacity-100 transition-opacity duration-300'
        style={{
          background: spotlightBackground,
        }}
      />

      {/* Ambient Glows */}
      <div className='absolute top-0 right-0 -z-10 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 opacity-20 blur-[100px]' />
      <div className='absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-500/20 opacity-20 blur-[100px]' />
    </div>
  )
}

/**
 * Status Badge Component
 */
function StatusBadge() {
  return (
    <div className='inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md'>
      <span className='relative flex h-2 w-2'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75'></span>
        <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500'></span>
      </span>
      Available for Hire
    </div>
  )
}

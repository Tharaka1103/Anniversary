'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HeartIcon, Sparkles, X, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import FallingHearts from '@/components/FallingHearts'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import confetti from 'canvas-confetti'

// Image gallery data
const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg',
  '/images/image6.jpg',
  '/images/image7.jpg',
  '/images/image8.jpg',
  '/images/image9.jpg',
  '/images/image11.jpg',
  '/images/image12.jpg',
  '/images/image13.jpg',
  '/images/image14.jpg',
  '/images/image15.jpg',
  // Add more images
]
const Preloader = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-40 h-40">
        {/* Outer Heart Container */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <HeartIcon className="w-full h-full text-primary/20" />
        </motion.div>

        {/* Filling Heart Container */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ 
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="relative w-full h-full"
          >
            <HeartIcon className="w-full h-full text-primary" />
            
            {/* Wave Effect */}
            <motion.div
              className="absolute inset-0 bg-primary/20"
              animate={{
                y: ["-5%", "0%", "-5%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                borderRadius: "50% 50% 0 0"
              }}
            />
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.p
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-primary font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 4
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [kissCount, setKissCount] = useState(0)

  // Preloader
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000) // 3 seconds for loading animation
  }, [])

  // Calculate time elapsed
  useEffect(() => {
    const loveStartDate = new Date('2020-03-10T04:00:00')

    const timer = setInterval(() => {
      const now = new Date()
      const difference = now.getTime() - loveStartDate.getTime()
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeElapsed({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <>
      <AnimatePresence>
      {loading && <Preloader />}
    </AnimatePresence>
    
    {!loading && (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <FallingHearts />
      {/* Love Alert */}
      {showTimeoutWarning && (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-4 sm:mx-6 mb-6"
            >
      <Alert className="relative bg-pink-50 border-pink-200">
                <AlertTitle className="text-pink-600 font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Happy 5th Anniversary, Manika! ❤️
                </AlertTitle>
                <AlertDescription className="text-pink-600">
                My dearest Manika, these past 5 years have been the most beautiful journey of my life. Every smile, every moment with you makes my world complete. I love you more and more with each passing day. When you need help, I'll always be there by your side, ready to support you through thick and thin. I promise to take care of you every moment, protect you, and cherish you forever pana. Your happiness is my priority, and seeing you smile brightens my entire world. I love you today, tomorrow, and for all the days to come. Here's to many more years of love, happiness, and endless adventures together, my precious Pana podda.
                </AlertDescription>                
                <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 hover:bg-pink-100"
                onClick={() => setShowTimeoutWarning(false)}
                >
                <X className="h-4 w-4 text-pink-600" />
                </Button>
            </Alert>            </motion.div>
            )}
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 mt-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Love Story</h1>
        <p className="text-xl text-muted-foreground">Since March 10, 2020</p>
      </motion.div>

      {/* Profile Section */}
      <div className="flex justify-center gap-8 items-center">
        <div className="text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="/images/partner1.jpg" />
            <AvatarFallback>P1</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold">Tharushi Sanjula</h3>
        </div>
        <AlertDialog>
  <AlertDialogTrigger>
    <HeartIcon className="w-8 h-8 text-primary animate-pulse hover:scale-110 transition-transform cursor-pointer" />
  </AlertDialogTrigger>
  <AlertDialogContent className="bg-pink-50 border-pink-200">
    <AlertDialogHeader>
      <AlertDialogTitle className="text-2xl text-pink-600 flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          💋
        </motion.div>
        Virtual Kisses
      </AlertDialogTitle>
      <AlertDialogDescription className="text-pink-500">
        Send a virtual kiss to your loved one! You've sent {kissCount} kisses so far.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div className="flex justify-center py-4">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => {
            setKissCount(prev => prev + 1)
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            })
          }}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full"
        >
          Send a Kiss 💋
        </Button>
      </motion.div>
    </div>
    <AlertDialogFooter>
      <AlertDialogCancel className="border-pink-200 text-pink-600 hover:bg-pink-100">
        Close
      </AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>        
<div className="text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="/images/partner2.jpg" />
            <AvatarFallback>P2</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold">Supun Tharaka</h3>
        </div>
      </div>      
      {/* Time Counter */}
      <Card className="mb-8 mt-10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center">Time Together</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold">{timeElapsed.days}</p>
              <p>Days</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold">{timeElapsed.hours}</p>
              <p>Hours</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold">{timeElapsed.minutes}</p>
              <p>Minutes</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold">{timeElapsed.seconds}</p>
              <p>Seconds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Our Memories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images
            .slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage)
            .map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  width={500}
                  height={500}
                  alt={`Memory ${index + 1}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-white text-sm md:text-base"
                  >
                    <SearchIcon className="w-6 h-6" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Pagination with modern design */}
        <div className="flex justify-center mt-8 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          {[...Array(Math.ceil(images.length / imagesPerPage))].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
              className="w-8 h-8"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => 
              Math.min(Math.ceil(images.length / imagesPerPage), prev + 1)
            )}
            disabled={currentPage === Math.ceil(images.length / imagesPerPage)}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-[90vw] max-h-[90vh]"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute -top-4 -right-4 rounded-full z-50"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Image
                  src={selectedImage}
                  width={500}
                  height={500}
                  alt="Fullscreen view"
                  className="rounded-lg object-contain max-h-[90vh] w-auto"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      const currentIndex = images.indexOf(selectedImage)
                      const prevImage = images[currentIndex - 1]
                      if (prevImage) setSelectedImage(prevImage)
                    }}
                    disabled={images.indexOf(selectedImage) === 0}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      const currentIndex = images.indexOf(selectedImage)
                      const nextImage = images[currentIndex + 1]
                      if (nextImage) setSelectedImage(nextImage)
                    }}
                    disabled={images.indexOf(selectedImage) === images.length - 1}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
    </div>
     )}
  </>
}

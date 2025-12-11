import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import introVideo from "@assets/generated_videos/vertis_logo_reveal_animation.mp4";
import vertisLogo from "@assets/vertis-logo.svg";

export function IntroVideo({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setIsVisible(false);
        onComplete();
      });

      const logoTimer = setTimeout(() => {
        setShowLogo(true);
      }, 1500);

      return () => clearTimeout(logoTimer);
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 800);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0B1F3A] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="intro-video-overlay"
        >
          <video
            ref={videoRef}
            src={introVideo}
            className="w-full h-full object-cover"
            muted
            playsInline
            onEnded={handleVideoEnd}
            data-testid="intro-video"
          />
          
          <AnimatePresence>
            {showLogo && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img 
                  src={vertisLogo} 
                  alt="Vertis Technology" 
                  className="w-64 sm:w-80 md:w-96 h-auto drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 0 40px rgba(51, 195, 240, 0.5))" }}
                  data-testid="img-intro-logo"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 px-4 py-2 text-white/70 hover:text-white text-sm font-medium transition-colors backdrop-blur-sm bg-white/10 rounded-md"
            data-testid="button-skip-intro"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

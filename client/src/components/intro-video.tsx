import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import introVideo from "@assets/generated_videos/tech_intro_animation_video.mp4";

export function IntroVideo({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setIsVisible(false);
        onComplete();
      });
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onComplete, 500);
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

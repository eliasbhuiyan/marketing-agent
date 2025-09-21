"use client"
import { useEffect, useState } from "react";
const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  const loadingSteps = [
    { text: "Initializing...", duration: 1000 },
    { text: "Loading components...", duration: 1500 },
    { text: "Connecting to server...", duration: 1200 },
    { text: "Fetching data...", duration: 1800 },
    { text: "Optimizing performance...", duration: 1000 },
    { text: "Almost ready...", duration: 800 },
    { text: "Welcome!", duration: 500 },
  ];

  useEffect(() => {
    let currentStep = 0;
    let currentProgress = 0;

    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);

        const increment = 100 / loadingSteps.length;
        const targetProgress = (currentStep + 1) * increment;

        const progressInterval = setInterval(() => {
          currentProgress += 2;
          if (currentProgress >= targetProgress) {
            currentProgress = targetProgress;
            clearInterval(progressInterval);

            setTimeout(() => {
              currentStep++;
              if (currentStep < loadingSteps.length) {
                updateProgress();
              } else {
                // Reset and restart loading
                setTimeout(() => {
                  currentStep = 0;
                  currentProgress = 0;
                  setProgress(0);
                  updateProgress();
                }, 1000);
              }
            }, step.duration);
          }
          setProgress(currentProgress);
        }, 50);
      }
    };

    // Start loading sequence after initial animation
    setTimeout(updateProgress, 1000);
  }, []);

  const FloatingShape = ({ delay, size, position }) => (
    <div
      className={`absolute ${position} ${size} bg-white/10 rounded-full float-animation glow-effect`}
      style={{ animationDelay: `${delay}s` }}
    />
  );

  const PulseRing = ({ delay }) => (
    <div
      className="absolute inset-0 border-2 border-white/30 rounded-full pulse-ring"
      style={{ animationDelay: `${delay}s` }}
    />
  );

  return (
    <div className="loader fixed top-0 left-0 flex items-center justify-center w-full h-screen z-[99999] overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingShape delay={0} size="w-32 h-32" position="top-10 left-10" />
      <FloatingShape delay={1} size="w-24 h-24" position="top-20 right-20" />
      <FloatingShape delay={2} size="w-40 h-40" position="bottom-20 left-20" />
      <FloatingShape
        delay={0.5}
        size="w-20 h-20"
        position="bottom-10 right-10"
      />
      <FloatingShape delay={1.5} size="w-28 h-28" position="top-1/2 left-5" />
      <FloatingShape delay={2.5} size="w-36 h-36" position="top-1/3 right-5" />

      {/* Spinning Background Ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 border border-white/10 rounded-full spin-slow"></div>
      </div>

      {/* Main Loading Content */}
      <div className="text-center z-10 slide-up">
        {/* Logo/Icon with Pulse Rings */}
        <div className="relative mb-12">
          <div className="relative w-32 h-32 mx-auto">
            <PulseRing delay={0} />
            <PulseRing delay={0.5} />
            <PulseRing delay={1} />
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center glow-effect bounce-in">
              <div className="text-5xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bounce-in">
          Loading
        </h1>

        <p
          className="text-xl text-white/80 mb-12 slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          {loadingText}
        </p>

        {/* Progress Bar */}
        <div
          className="w-80 mx-auto mb-8 slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="bg-white/20 rounded-full h-3 backdrop-blur-sm overflow-hidden">
            <div
              className="progress-bar h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-white/60 text-sm mt-2">
            <span>0%</span>
            <span className="font-semibold text-white">
              {Math.round(progress)}%
            </span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div
          className="flex justify-center space-x-2 mb-8 slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="w-3 h-3 bg-white rounded-full loading-dot"></div>
          <div className="w-3 h-3 bg-white rounded-full loading-dot"></div>
          <div className="w-3 h-3 bg-white rounded-full loading-dot"></div>
        </div>

        {/* Status Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto slide-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl mb-2">🚀</div>
            <div className="text-white/80 text-sm">Performance</div>
            <div className="text-white font-semibold">Optimized</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-white/80 text-sm">Security</div>
            <div className="text-white font-semibold">Protected</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-white/80 text-sm">Speed</div>
            <div className="text-white font-semibold">Lightning Fast</div>
          </div>
        </div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;

import { useState, useEffect, useRef } from "react";
import {
  Clock,
  Moon,
  Sun,
  ChefHat,
  Flame,
  Timer,
  ChevronDown,
  ChevronUp,
  Info,
  UtensilsCrossed,
  Share2,
  Twitter,
  Facebook,
  Instagram,
  Copy,
  Check,
  X,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Play,
  Pause,
  Heart,
} from "lucide-react";
import "./App.css";
import biryaniLogo from "./assets/biriyani.jpg";

// Recipe Data
const recipe = {
  title: "Hyderabadi Chicken Biryani",
  description:
    "A classic authentic royal dish with layers of fluffy rice, fragrant spices, and tender chicken.",
  prepTime: "45 mins",
  cookTime: "2 hrs",
  servings: 4,
  ingredients: [
    "1 kg Chicken (cut into pieces)",
    "1 kg Basmati Rice (soaked for 30 mins)",
    "4 Large Onions (thinly sliced & fried golden)",
    "1 cup Thick Yogurt",
    "2 tbsp Ginger Garlic Paste",
    "Whole Spices (4 Cardamom, 4 Cloves, 2 inch Cinnamon, 2 Bay leaves)",
    "1 tsp Turmeric, 2 tsp Red Chili Powder",
    "1 tsp Garam Masala / Biryani Masala",
    "Saffron strands soaked in 1/2 cup warm milk",
    "1 cup Fresh Mint & Coriander leaves (chopped)",
    "4 tbsp Ghee & 4 tbsp Oil",
    "Salt to taste",
  ],
  steps: [
    {
      title: "Marination",
      description:
        "In a large bowl, mix chicken with yogurt, ginger-garlic paste, turmeric, chili powder, garam masala, salt, half of the fried onions, mint, and coriander. Massage well.",
      duration: 3600, // 1 hour
      tips: "For best results, marinate overnight in the refrigerator.",
      video: "/videos/step1.mp4",
    },
    {
      title: "Prepare Rice",
      description:
        "Boil 3 liters of water with whole spices (cardamom, cloves, cinnamon, bay leaf) and plenty of salt. Add soaked rice. Cook until 70% done (grains should break but have a bite). Drain water.",
      duration: 900, // 15 mins
      tips: "The water should be as salty as sea water.",
      video: "/videos/step2.mp4",
    },
    {
      title: "Layering (Dum)",
      description:
        "In a heavy-bottomed pot, spread the marinated chicken evenly. Layer the 70% cooked rice over it. Sprinkle remaining fried onions, mint, coriander, saffron milk, and drizzle ghee on top.",
      duration: 600, // 10 mins
      tips: "You can place sliced tomatoes or potatoes at the bottom to prevent chicken from burning.",
      video: "/videos/step3.mp4",
    },
    {
      title: "The Dum Process",
      description:
        "Seal the pot tightly with aluminum foil or dough. Place on high heat for 18 mins, then lower heat to minimum and cook for 20 mins. Turn off heat and let it rest for 15 mins.",
      duration: 1800, // 30 mins
      tips: "Do not open the lid immediately. The resting period allows flavors to settle.",
      video: "/videos/step4.mp4",
    },
  ],
  tips: [
    {
      title: "Rice Quality",
      content:
        "Always use aged Basmati rice (at least 1-2 years old) for long, separate grains.",
    },
    {
      title: "The 'Birista'",
      content:
        "Golden fried onions are the soul of Biryani. Fry them on medium heat and remove before they turn dark brown as they continue to cook in residual heat.",
    },
    {
      title: "Dum Technique",
      content:
        "If your pot bottom isn't heavy enough, place a flat tawa (griddle) under the pot to diffuse the heat and prevent burning.",
    },
  ],
};

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function App() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleStepComplete = (index: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  const totalSteps = recipe.steps.length;
  const progress = (completedSteps.size / totalSteps) * 100;
  const isAllDone = completedSteps.size === totalSteps;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this amazing ${recipe.title} recipe!`;

  const shareToX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareToFB = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Share Recipe
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <button
                onClick={shareToX}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Twitter className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  X
                </span>
              </button>

              <button
                onClick={shareToFB}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 bg-[#1877F2] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Facebook className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Facebook
                </span>
              </button>

              <button
                onClick={copyLink}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Instagram
                </span>
              </button>

              <button
                onClick={copyLink}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Copy
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent border-none flex-1 text-sm text-gray-500 dark:text-gray-400 focus:ring-0 outline-none w-full"
              />
              <button
                onClick={copyLink}
                className="text-primary-600 dark:text-primary-400 font-bold text-sm hover:underline px-2"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={biryaniLogo}
              alt="Biryani Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-orange-500 bg-clip-text text-transparent">
              BiryaniMaster
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Share recipe"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full blur opacity-30 dark:opacity-50"></div>
            <UtensilsCrossed className="relative w-20 h-20 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {recipe.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {recipe.description}
          </p>

          <div className="flex justify-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <Clock className="w-4 h-4 text-primary-500" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <UtensilsCrossed className="w-4 h-4 text-green-500" />
              <span>Serves: {recipe.servings}</span>
            </div>
          </div>
        </section>

        {/* Ingredients */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
            Ingredients
          </h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-3 group">
                <div className="mt-1 w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center group-hover:border-primary-500 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {ingredient}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section className="space-y-8">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-1 h-8 bg-primary-500 rounded-full"></span>
            Cooking Steps
          </h3>
          <div className="space-y-6">
            {recipe.steps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                index={index}
                onComplete={() => handleStepComplete(index)}
                isCompleted={completedSteps.has(index)}
              />
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="grid md:grid-cols-3 gap-6">
          {recipe.tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-800/50 p-6 rounded-xl border border-primary-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
                <Info className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                {tip.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {tip.content}
              </p>
            </div>
          ))}
        </section>

        {/* About Me */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-r from-primary-500 to-orange-500 transform hover:scale-105 transition-transform duration-300">
            <img
              src="/Me.jpg"
              alt="Arundhati Das"
              className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            About the Chef <ChefHat className="w-6 h-6 text-primary-500" />
          </h3>
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-4 text-lg">
            Arundhati Das
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed italic">
            "Passionate about bringing authentic flavors to your kitchen. I
            believe that cooking is an art form that brings people together.
            This Biryani recipe is close to my heart, perfected over years of
            family gatherings. Enjoy!"
          </p>
          <div className="mt-6 flex justify-center">
            <Heart
              className="w-6 h-6 text-red-500 animate-pulse"
              fill="currentColor"
            />
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 text-center text-gray-500 dark:text-gray-400 text-sm pb-24">
        <p>© 2025 Arundhati Das.</p>
      </footer>

      {/* Bottom Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Cooking Progress
              </span>
              <span className="font-bold text-primary-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-orange-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {isAllDone && (
            <button
              onClick={() => setShowCelebration(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all animate-bounce"
            >
              Biryani Done! 🎉
            </button>
          )}
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="text-center space-y-6 max-w-lg relative">
            <div className="text-6xl animate-bounce">🥘 ✨ 🎉</div>
            <h2 className="text-4xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Biryani Master!
            </h2>
            <p className="text-gray-200 text-lg">
              Congratulations! You've successfully cooked authentic Hyderabadi
              Chicken Biryani. Time to feast!
            </p>
            <button
              onClick={() => setShowCelebration(false)}
              className="bg-white text-primary-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Let's Eat!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function playAlarm() {
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.error("Audio play failed", e);
  }
}

function StepCard({
  step,
  index,
  onComplete,
  isCompleted,
}: {
  step: any;
  index: number;
  onComplete: () => void;
  isCompleted: boolean;
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(step.duration);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isVideoPaused]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev: number) => {
          if (prev <= 1) {
            playAlarm();
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, onComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(step.duration);
  };

  const progress = ((step.duration - timeLeft) / step.duration) * 100;

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
        isRunning ? "ring-2 ring-primary-500 shadow-lg scale-[1.01]" : ""
      } ${isCompleted ? "border-green-500 dark:border-green-500" : ""}`}
    >
      {/* Video Background/Overlay when running */}
      {isRunning && step.video && showVideo && (
        <div className="relative w-full aspect-video bg-black overflow-hidden animate-fade-in">
          <video
            ref={videoRef}
            src={step.video}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-4">
            <p className="text-white font-medium text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              Cooking in progress...
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsVideoPaused(!isVideoPaused)}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
                title={isVideoPaused ? "Play Video" : "Pause Video"}
              >
                {isVideoPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setShowVideo(false)}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
                title="Hide Video"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-bold text-sm">
                {index + 1}
              </span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                {step.title}
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {step.description}
            </p>

            {/* Interactive Tip Toggle */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1 hover:underline"
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {isExpanded ? "Hide Chef's Tip" : "Show Chef's Tip"}
              </button>

              {isRunning && !showVideo && step.video && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="text-sm text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1 hover:underline"
                >
                  <Eye className="w-4 h-4" />
                  Show Video
                </button>
              )}
            </div>

            {isExpanded && (
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm rounded-lg border border-yellow-100 dark:border-yellow-900/30 animate-fade-in">
                <span className="font-bold">💡 Tip: </span>
                {step.tips}
              </div>
            )}

            {/* Manual Done Button */}
            <div className="mt-4">
              <button
                onClick={onComplete}
                disabled={isCompleted}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  isCompleted
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {isCompleted ? (
                  <>
                    <Check className="w-4 h-4" />
                    Done
                  </>
                ) : (
                  "Mark as Done"
                )}
              </button>
            </div>
          </div>

          {/* Timer Section */}
          <div className="flex flex-col items-center gap-2 min-w-[100px]">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Animated Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  className="stroke-gray-200 dark:stroke-gray-700 fill-none"
                  strokeWidth="6"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  className={`stroke-primary-500 fill-none transition-all duration-1000 ease-linear ${
                    isRunning ? "opacity-100" : "opacity-0"
                  }`}
                  strokeWidth="6"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-xl font-mono font-bold ${
                    timeLeft < 60
                      ? "text-red-500"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
              {/* Pulse Effect when running */}
              {isRunning && (
                <div className="absolute inset-0 rounded-full border-4 border-primary-500/30 animate-ping pointer-events-none"></div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={toggleTimer}
                className={`p-2 rounded-full transition-colors ${
                  isRunning
                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400"
                }`}
                title={isRunning ? "Pause" : "Start Timer"}
              >
                {isRunning ? (
                  <span className="font-bold text-xs">||</span>
                ) : (
                  <Timer className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={resetTimer}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 transition-colors"
                title="Reset"
              >
                <span className="text-xs font-bold">↺</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar at bottom of card */}
      {isRunning && (
        <div className="h-1 w-full bg-gray-100 dark:bg-gray-700">
          <div
            className="h-full bg-primary-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default App;

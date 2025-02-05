import React, { useState, useRef } from "react";
import Timer from "./Timer";
import SocialShare from "./SocialShare";
import {
  Check,
  ChevronRight,
  Clock,
  Utensils,
  Flame,
  Heart,
  ThumbsUp,
  Share2,
  LucideChevronsRight,
} from "lucide-react";

const BiriyaniRecipe = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showTip, setShowTip] = useState(null);
  const timerRefs = useRef({});

  const ingredients = [
    { id: 1, name: "Basmati Rice", amount: "2 cups", icon: "🍚" },
    { id: 2, name: "Chicken", amount: "500g", icon: "🍗" },
    { id: 3, name: "Onions", amount: "2 large", icon: "🧅" },
    { id: 4, name: "Yogurt", amount: "1 cup", icon: "🥛" },
    { id: 5, name: "Biryani Masala", amount: "3 tbsp", icon: "🥄" },
    { id: 6, name: "Chicken Masala", amount: "2 tbsp", icon: "🥄" },
    { id: 7, name: "Garam Masala", amount: "1/2 tbsp", icon: "🍛" },
    { id: 8, name: "Ginger-Garlic Paste", amount: "2 tbsp", icon: "🫚" },
    { id: 9, name: "Lemon Juice", amount: "2 tbsp", icon: "🍋" },
    { id: 10, name: "Red Chlli Powder", amount: "2 tbsp", icon: "🌶️" },
  ];

  const steps = [
    {
      id: 1,
      text: "Soak basmati rice in water (2 cups) and cut onions in half moons and golden fry them",
      duration: 1800,
      tip: "Use room temperature water for better results",
    },
    {
      id: 2,
      text: "Marinate chicken with yogurt, Lemon Juice, Mint Leaves, Fried Onions and spices(Garam Masala, Chicken Masala, Ginger-Garlic Paste, Red Chili Powder)",
      duration: 3600,
      tip: "Ensure even coating of spices for best flavor",
    },
    {
      id: 3,
      text: "Cook rice until 60% done",
      duration: 900,
      tip: "Rice should be firm but not hard when pressed",
    },
    {
      id: 4,
      text: "Layer marinated chicken at the bottom and make layers of rice with golden fried onions and Mint leaves between the layers",
      duration: 300,
      tip: "Create even layers for consistent cooking",
    },
    {
      id: 5,
      text: "Cook the chicken on High heat for 20 mins",
      duration: 1200,
      tip: "Cover the lid holes if any with a flour dough",
    },
    {
      id: 6,
      text: "Cook the chicken on Medium heat for 16-20 mins",
      duration: 1200,
      tip: "Keep a flat pan as a base for cooking, to prevent it from burning",
    },
  ];

  const handleStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      if (timerRefs.current[stepId]?.current?.stop) {
        timerRefs.current[stepId].current.stop();
      }

      setCompletedSteps([...completedSteps, stepId]);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // const CompletionMessage = () => {
  //   if (completedSteps.length === steps.length) {
  //     return (
  //       <div className="mt-8 text-center space-y-4">
  //         <p className="text-gray-600 mb-2">
  //           {completedSteps.length === steps.length ? (
  //             <span className="flex items-center justify-center gap-2 text-green-600 font-medium">
  //               <Heart className="w-5 h-5" /> Congratulations! Your Biryani is
  //               ready to serve!
  //             </span>
  //           ) : (
  //             `${completedSteps.length} of ${steps.length} steps completed`
  //           )}
  //         </p>
  //         <div className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg">
  //           {/* <img
  //             src="/biryani-recipe/public/Biriyani.png"
  //             alt="Delicious Biryani"
  //             className="w-full h-full object-cover rounded-xl"
  //           /> */}
  //           <div className="p-4 bg-orange-50">
  //             <p className="text-orange-600 font-medium">
  //               Time to enjoy your homemade Biryani! 🎉
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  // };

  // const markStepComplete = (stepId) => {
  //   if (!completedSteps.includes(stepId)) {
  //     handleStepComplete(stepId);
  //   }
  // };

  const progressPercentage = (completedSteps.length / steps.length) * 100;

  return (
    <div className="max-w-8xl mx-auto p-4 md:p-20 bg-white rounded-xl shadow-lg">
      <div className="mb-4 md:mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-20 gap-4">
          <h2 className="text-3xl md:text-6xl font-bold text-red-700 flex items-center gap-3">
            <Flame className="w-12 h-12 md:w-20 md:h-20 text-orange-500" />
            Arundhati's Special Chicken Biriyani Recipe
          </h2>
          <div className="flex items-center gap-2 text-gray-600 text-base md:text-xl">
            <Clock className="w-6 h-6 md:w-8 md:h-8" />
            <span>Total Time: 3h 15m</span>
          </div>
        </div>
      </div>
      {/*Ingredients Section */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-6 flex items-center">
          <Utensils className="w-5 h-5 md:w-6 md:h-6 mr-2" />
          <span>Ingredients</span>
          <div className="h-px flex-grow bg-gray-200 ml-4"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-10">
          {ingredients.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-6xl">{item.icon}</span>
                <span className="text-base md:text-xl text-gray-600">
                  {item.name}
                </span>
              </div>
              <span className="text-base md:text-xl text-gray-600">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cooking Steps section */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-6 flex items-center">
          <Clock className="w-5 h-5 md:w-6 md:h-6 mr-2" />
          Cooking Steps
        </h2>

        <div className="space-y-4">
          {steps.map((step, index) => {
            if (!timerRefs.current[step.id]) {
              timerRefs.current[step.id] = React.createRef();
            }

            return (
              <div
                key={step.id}
                className={`p-6 rounded-lg transition-all duration-300 ${
                  currentStep === index
                    ? "bg-white-100 border-2 border-orange-400 shadow-lg"
                    : completedSteps.includes(step.id)
                    ? "bg-white-50 border border-green-200"
                    : "bg-white border border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] items-start md:items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-4">
                      {completedSteps.includes(step.id) ? (
                        <div className="bg-green-100 p-2 justify-center rounded-full flex-shrink-0">
                          <Check className="text-green-600 w-5 h-5" />
                        </div>
                      ) : (
                        <div
                          className={`p-2 rounded-full flex-shrink-0 w-8 h-8 flex items-center justify-center
                          ${
                            currentStep === index
                              ? "bg-orange-400 text-white"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                        >
                          <span className="text-white-600 font-medium">
                            {index + 1}
                          </span>
                        </div>
                      )}
                      <span
                        className={`text-sm md:text-base ${
                          completedSteps.includes(step.id)
                            ? "text-gray-600 font-small"
                            : "text-gray-900 font-medium"
                        }`}
                      >
                        {step.text}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row w-full md:w-auto items-start md:items-center gap-3 md:gap-5">
                      <Timer
                        duration={step.duration}
                        onComplete={() => handleStepComplete(step.id)}
                        onReset={() => {
                          setCompletedSteps([]);
                          setCurrentStep(0);
                        }}
                        timerRef={timerRefs.current[step.id]}
                      />
                      <button
                        onClick={() => handleStepComplete(step.id)}
                        className={`w-full md:w-auto px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                          completedSteps.includes(step.id)
                            ? "bg-green-100 text-green-700 cursor-default"
                            : "bg-green-700 text-white hover:bg-orange-600"
                        }`}
                        disabled={completedSteps.includes(step.id)}
                      >
                        {completedSteps.includes(step.id)
                          ? "Completed"
                          : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                  <div className="ml-12 md:ml-14 flex items-center gap-2">
                    <span
                      className="text-amber-500 hover:text-amber-600"
                      onClick={() =>
                        setShowTip(showTip === step.id ? null : step.id)
                      }
                    >
                      <LucideChevronsRight className="w-5 h-5 md:w-6 md:h-6" />
                    </span>
                    {showTip === step.id && (
                      <div className="text-sm md:text-base text-amber-600 bg-orange-50 p-3 rounded-lg">
                        {step.tip}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-4 md:p-6 text-center">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 md:mt-8 text-center">
        <p className="text-sm md:text-base text-gray-600 mb-2">
          {completedSteps.length === steps.length ? (
            <span className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <Heart className="w-5 h-5" /> Congratulations! Your Biryani is
              ready to serve!
            </span>
          ) : (
            `${completedSteps.length} of ${steps.length} steps completed`
          )}
        </p>
      </div>
      {/* Social Sharing
      <div className="flex justify-end gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
          <ThumbsUp className="w-5 h-5" />
          Like
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div> */}
      <div className="mt-8 flex justify-end">
        <SocialShare />
      </div>
    </div>
  );
};

export default BiriyaniRecipe;

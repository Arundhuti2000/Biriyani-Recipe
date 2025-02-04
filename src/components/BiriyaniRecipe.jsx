import React, { useState } from "react";
import Timer from "./Timer";
import { Check, ChevronRight, Clock, Utensils, Info } from "lucide-react";

const BiriyaniRecipe = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showTip, setShowTip] = useState(null);

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
      setCompletedSteps([...completedSteps, stepId]);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const markStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      handleStepComplete(stepId);
    }
  };

  const progressPercentage = (completedSteps.length / steps.length) * 100;

  return (
    <div className="max-w-8xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Classic Chicken Biryani
      </h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold backdrop-blur text-gray-700 mb-6 flex items-center">
          <Utensils className="w-6 h-6 mr-2" />
          <span>Ingredients</span>
          <div className="h-px flex-grow bg-gray-200 ml-4"></div>
        </h2>
        <div className="grid md:grid-cols-5 gap-10">
          {ingredients.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-6xl">{item.icon}</span>
                <span className="text-xl text-gray-600">{item.name}</span>
              </div>
              <span className="text-xl text-gray-600">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cooking Steps section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold backdrop-blur text-gray-700 mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-2" />
          Cooking Steps
        </h2>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-6 rounded-lg transition-all duration-200 ${
                currentStep === index
                  ? "bg-gray-100 border-2 border-gray-300 shadow-lg"
                  : completedSteps.includes(step.id)
                  ? "bg-green-50 border border-green-200"
                  : "bg-white border border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="text-xl grid grid-cols-[1fr_auto] items-center gap-4">
                  <div className="flex items-center gap-4">
                    {completedSteps.includes(step.id) ? (
                      <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                        <Check className="text-green-600 w-5 h-5" />
                      </div>
                    ) : (
                      <div className="bg-gray-100 p-2 rounded-full flex-shrink-0">
                        <ChevronRight className="text-gray-600 w-5 h-5" />
                      </div>
                    )}
                    <span
                      className={
                        completedSteps.includes(step.id)
                          ? "text-gray-500"
                          : "text-gray-700"
                      }
                    >
                      {step.text}
                    </span>
                  </div>
                  <div className="flex font-medium items-center gap-4 flex-shrink-0">
                    <Timer
                      duration={step.duration}
                      onComplete={() => handleStepComplete(step.id)}
                      onReset={() => {
                        setCompletedSteps([]);
                        setCurrentStep(0);
                      }}
                    />
                    <button
                      onClick={() => markStepComplete(step.id)}
                      className={`px-4 py-2 rounded-lg tracking-wide font-medium transition-colors  whitespace-nowrap ${
                        completedSteps.includes(step.id)
                          ? "bg-green-100 text-green-700 cursor-default"
                          : "bg-green-700 text-white hover:bg-green-800"
                      }`}
                      disabled={completedSteps.includes(step.id)}
                    >
                      {completedSteps.includes(step.id)
                        ? "Completed"
                        : "Mark Complete"}
                    </button>
                  </div>
                </div>
                <div className="ml-14 flex items-center gap-2">
                  <span
                    className="w-6 h-6 text-grey-400 cursor-pointer"
                    onClick={() =>
                      setShowTip(showTip === step.id ? null : step.id)
                    }
                  >
                    💡
                  </span>
                  {showTip === step.id && (
                    <div className="text-grey-600 bg-gray-50 p-3 rounded-lg">
                      {step.tip}
                    </div>
                  )}
                </div>
                {/* <div className="ml-14 text-gray-600  p-2 rounded-lg ">
                  💡 Tip: {step.tip}
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Section */}
      <div className="text-center">
        <div className="mt-2 mb-2 text-gray-600 font-medium">
          Progress: {completedSteps.length} / {steps.length} steps completed
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BiriyaniRecipe;

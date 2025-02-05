import React, { useState } from "react";
import { Share2, Mail, MessageCircle, Link, Copy } from "lucide-react";

const SocialShare = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const recipeUrl = window.location.href;
  const recipeTitle = "Arundhati's Special Chicken Biriyani Recipe";

  const shareData = {
    email: `mailto:?subject=${encodeURIComponent(
      recipeTitle
    )}&body=${encodeURIComponent(recipeUrl)}`,
    sms: `sms:?body=${encodeURIComponent(`${recipeTitle} ${recipeUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      recipeUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      recipeUrl
    )}&text=${encodeURIComponent(recipeTitle)}`,
  };

  const handleShare = (platform) => {
    if (platform === "email" || platform === "sms") {
      window.location.href = shareData[platform];
    } else {
      window.open(shareData[platform], "_blank", "width=600,height=400");
    }
    setShowDialog(false);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(recipeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDialog(!showDialog)}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100"
      >
        <Share2 className="w-5 h-5" />
        Share Recipe
      </button>

      {showDialog && (
        <div className="absolute right-0 bottom-12 w-64 bg-white rounded-lg shadow-lg border p-4 z-50">
          <h3 className="text-lg font-semibold mb-4">Share Recipe</h3>
          <div className="space-y-3">
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-blue-50 text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
              </svg>
              Share on Facebook
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-blue-50 text-sky-400"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </button>
            <button
              onClick={() => handleShare("email")}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-blue-50 text-blue-600"
            >
              <Mail className="w-5 h-5" />
              Share via Email
            </button>
            <button
              onClick={() => handleShare("sms")}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-green-50 text-green-600"
            >
              <MessageCircle className="w-5 h-5" />
              Share via Message
            </button>
            <button
              onClick={copyLink}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50"
            >
              <Copy className="w-5 h-5" />
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      )}
      {showDialog && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

export default SocialShare;

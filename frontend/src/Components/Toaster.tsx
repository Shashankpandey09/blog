import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastStore } from "../store/Toast";

type ToastVar = "success" | "error" | "info";


const Toaster: React.FC = () => {
 const {toast,clearToast}=ToastStore()
 const variant:ToastVar=toast.variant
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      clearToast()
    },toast.duration);
    return () => {clearTimeout(timer);
      
    }
  }, [toast.duration]);
  const variantStyles = {
    success: {
      text: "text-green-700",
      icon: "✅",
      border: "border-[#404040]",
      gradient: "from-[#2D2D2D] to-[#1A1A1A]",
    },
    error: {
      text: "text-red-700",
      icon: "❌",
      border: "border-[#404040]",
      gradient: "from-[#2D2D2D] to-[#1A1A1A]",
    },

    info: {
      text: "text-blue-700",
      icon: "ℹ️",
      border: "border-[#404040]",
      gradient: "from-[#2D2D2D] to-[#1A1A1A]",
    },
  };
  return (
    <AnimatePresence>
      {isVisible && toast.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 min-w-[250px] max-w-[90vw] rounded-md shadow-lg p-4 border-b-[#d4a373] border ${variantStyles[variant].border} bg-gradient-to-r ${variantStyles[variant].gradient} cursor-pointer backdrop-blur-sm z-50`}
          role={"alert"}
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{variantStyles[variant].icon}</span>
            <div className="flex-1">
              <p
                className={`text-sm font-bold ${variantStyles[variant].text} `}
              >
                {toast.message}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="text-[#d4a373] hover:text-[#E6B280] transition-colors"
              aria-label="Close toast"
            >
              ✕
            </button>
          </div>
          {/* 11. Animated progress bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: 0 }}
            transition={{ duration: toast.duration / 1000 }}
            className={`h-1 bg-[#d4a373] mt-2 rounded-full `}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Toaster;

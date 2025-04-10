import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastStore } from "../store/Toast";
import { variantStyles } from "../assets/Constants";

type ToastVar = "success" | "error" | "info";

const Toaster: React.FC = () => {
 const {toast,clearToast}=ToastStore()
 const variant:ToastVar=toast.variant
  useEffect(() => {
  if(!toast.message) return
    
    const timer = setTimeout(() => {
      clearToast()
    },toast.duration);
  
    return () =>clearTimeout(timer)
    
  }, [toast.duration,toast.message]);


  return (
    <AnimatePresence>
      { toast.message && (
        <motion.div
        key={Date.now()}
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
                clearToast();
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

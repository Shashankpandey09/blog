const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/90 flex items-center justify-center z-50">
    <div className="text-center space-y-4">
      <div className="relative w-20 h-20 mx-auto">
        {/* Pixel spinner */}
        <div className="absolute w-full h-full border-4 border-t-[#d4a373] border-r-[#d4a373] border-b-[#404040] border-l-[#404040] rounded-full animate-spin-pixel"></div>
        
        {/* Center pixel */}
        <div className="absolute inset-0 m-auto w-4 h-4 bg-[#d4a373] animate-pulse"></div>
      </div>
      
      <p className="font-pixel text-[#d4a373] text-lg animate-blink">
        INITIALIZING ACCOUNT...
      </p>
    </div>
  </div>
  )
}
export default Loader

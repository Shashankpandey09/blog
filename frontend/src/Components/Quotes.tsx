// Quotes component with dark theme
// Quotes component
const Quotes = () => {
  return (
    <div className="h-screen bg-[#1A1A1A] flex justify-center items-center border-l-2 border-[#404040]">
      <section className="w-3/4">
        <div className="border-2 border-[#d4a373] p-8 rounded-xl bg-[#2D2D2D]/50 backdrop-blur-sm">
          <p className="text-[#E5E5E5] font-pixel text-3xl lg:text-4xl leading-relaxed animate-glow pixel-text">
            "BLOGGING: NOT JUST SHARING<br/>
            BUT CREATING WORLDS WHERE<br/>
            IDEAS COLLIDE & EMPOWER!"
          </p>
          <p className="mt-6 text-[#A3A3A3] font-pixel text-right text-xl animate-pulse">
            {'>>'} SARAH_JOHNSON
          </p>
        </div>
      </section>
    </div>
  );
};
export default Quotes
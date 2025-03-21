
const Skeleton = () => (
  <div className="min-h-screen bg-[#1A1A1A] text-[#E5E5E5] font-mono">
    <nav className="border-b border-[#404040] py-4 px-6 lg:px-12">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="h-8 w-32 bg-[#404040] rounded animate-pulse" />
        <div className="flex items-center space-x-8">
          <div className="h-6 w-24 bg-[#404040] rounded animate-pulse" />
          <div className="w-10 h-10 rounded-full bg-[#404040] animate-pulse" />
        </div>
      </div>
    </nav>

    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        <aside className="space-y-8">
          <div className="bg-[#2D2D2D] p-6 rounded-xl border border-[#404040]">
            <div className="h-6 w-32 bg-[#404040] rounded mb-4 animate-pulse" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-[#404040] rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          <div className="bg-[#2D2D2D] p-6 rounded-xl border border-[#404040]">
            <div className="h-6 w-32 bg-[#404040] rounded mb-4 animate-pulse" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-[#404040] rounded animate-pulse" />
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-12">
          <div className="bg-gradient-to-r from-[#2D2D2D] to-[#1A1A1A] p-8 rounded-2xl border border-[#404040]">
            <div className="h-10 w-64 bg-[#404040] rounded mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-[#404040] rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#2D2D2D] rounded-xl border border-[#404040] p-6">
                <div className="flex justify-between gap-2 items-start mb-4">
                  <div className="h-6 w-20 bg-[#404040] rounded-full animate-pulse" />
                </div>
                <div className="h-6 w-48 bg-[#404040] rounded mb-4 animate-pulse" />
                <div className="h-4 w-32 bg-[#404040] rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-10 bg-[#404040] rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);
export default Skeleton;
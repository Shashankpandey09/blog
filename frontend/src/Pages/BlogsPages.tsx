// src/pages/Blogs.tsx
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BlogStore } from "../store/Blogs";
import RenderBlogs from "../Components/RenderBlogs";

const Blogs = () => {
  const { blogs, getBlogs } = BlogStore();
  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E5E5] font-mono">
      <nav className="border-b border-[#404040] py-4 px-6 lg:px-12">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link
            to="/"
            className="font-pixel text-2xl text-[#d4a373] hover:text-[#E6B280] transition-colors"
          >
            DEV_ARCADE
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              to="/create"
              className="text-[#A3A3A3] hover:text-[#d4a373] transition-colors"
            >
              NEW_POST+
            </Link>
            <div className="w-10 h-10 rounded-full bg-[#d4a373]/20 border border-[#d4a373] flex items-center justify-center">
              <span className="text-[#d4a373] font-pixel">LV27</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-[#2D2D2D] p-6 rounded-xl border border-[#404040]">
              <h3 className="font-pixel text-xl text-[#d4a373] mb-4">
                FILTERS
              </h3>
              <div className="space-y-3">
                {["All", "Engineering", "Design", "Strategy"].map((cat) => (
                  <button
                    key={cat}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#404040] transition-colors text-[#A3A3A3]"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#2D2D2D] p-6 rounded-xl border border-[#404040]">
              <h3 className="font-pixel text-xl text-[#d4a373] mb-4">STATS</h3>
              <div className="space-y-2 text-[#A3A3A3]">
                <p>Total Posts: 127</p>
                <p>Avg. Read Time: 8min</p>
                <p>Engagement: 89%</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="space-y-12">
            <div className="bg-gradient-to-r from-[#2D2D2D] to-[#1A1A1A] p-8 rounded-2xl border border-[#404040]">
              <h1 className="font-pixel text-4xl text-[#d4a373] mb-4">
                CODE_CHRONICLES
              </h1>
              <p className="text-[#A3A3A3] max-w-2xl">
                Curated collection of technical essays bridging game design
                philosophy with modern software development practices.
              </p>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(blogs ?? []).map((blog) => {
                return <RenderBlogs  blog={blog} />;
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg ${
                    page === 1
                      ? "bg-[#d4a373] text-[#1A1A1A]"
                      : "bg-[#2D2D2D] text-[#A3A3A3] hover:bg-[#404040]"
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#404040] mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#A3A3A3]">
            <div>
              <h4 className="font-pixel text-lg text-[#d4a373] mb-4">
                NAVIGATE
              </h4>
              <div className="space-y-2">
                <p>Documentation</p>
                <p>API Reference</p>
                <p>Support</p>
              </div>
            </div>
            <div>
              <h4 className="font-pixel text-lg text-[#d4a373] mb-4">SOCIAL</h4>
              <div className="space-y-2">
                <p>GitHub</p>
                <p>Twitter</p>
                <p>Discord</p>
              </div>
            </div>
            <div>
              <h4 className="font-pixel text-lg text-[#d4A373] mb-4">LEGAL</h4>
              <div className="space-y-2">
                <p>Privacy</p>
                <p>Terms</p>
                <p>Licenses</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blogs;

// src/pages/Homepage.tsx
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Homepage = () => {
  // Typewriter effect initialization
  useEffect(() => {
    const elements = document.querySelectorAll('.typewriter');
    elements.forEach(el => {
      const text = el.textContent || '';
      el.innerHTML = '';
      //@ts-ignore
      el.style.setProperty('--steps', String(text.length));
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E5E5] font-mono">
      {/* Navigation Bar */}
      <nav className="border-b border-[#404040] py-4 px-6 lg:px-12">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="font-pixel text-2xl text-[#d4a373] hover:text-[#E6B280] transition-colors">
            BLOGGER_OS
          </Link>
          <div className="space-x-6">
            <Link to="/signup" className="text-[#A3A3A3] hover:text-[#d4a373] transition-colors">
              SIGN_UP
            </Link>
            <Link to="/blogs" className="text-[#A3A3A3] hover:text-[#d4a373] transition-colors">
              BLOGS
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-[#404040]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
          <div className="animate-glow">
            <h1 className="font-pixel text-4xl md:text-6xl mb-6 typewriter" style={{ '--steps': 40 } as React.CSSProperties}>
              WELCOME_TO_THE_BLOG_OS
            </h1>
            <p className="text-[#A3A3A3] text-lg md:text-xl mb-8 max-w-3xl">
              WHERE_GAMERS_AND_DEVS_SHARE_THEIR_<span className="text-[#d4a373]">STORIES</span>
            </p>
            <Link 
              to="/blogs" 
              className="inline-block bg-[#d4a373] text-[#1A1A1A] font-pixel px-8 py-3 rounded-lg hover:bg-[#E6B280] transition-colors text-lg"
            >
              EXPLORE_POSTS
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Grid */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <h2 className="font-pixel text-3xl mb-12 text-[#d4a373]">LATEST_UPDATES</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((post) => (
            <article 
              key={post}
              className="bg-[#2D2D2D] border border-[#404040] rounded-lg p-6 hover:border-[#d4a373] transition-colors"
            >
              <div className="mb-4">
                <span className="font-pixel text-sm text-[#E6B280]">CATEGORY_{post}</span>
              </div>
              <h3 className="text-xl mb-3">Next-Level Blogging Techniques</h3>
              <p className="text-[#A3A3A3] mb-4">
                Discover cutting-edge strategies to enhance your content creation workflow...
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#d4a373]">READ_TIME: 5min</span>
                <Link to="/post/1" className="text-[#A3A3A3] hover:text-[#d4a373]">
                  READ_MORE →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#404040] mt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-pixel text-lg text-[#d4a373]">CONNECT_WITH_US</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-[#A3A3A3] hover:text-[#d4a373]">TWITTER</a>
                <a href="#" className="text-[#A3A3A3] hover:text-[#d4a373]">DISCORD</a>
              </div>
            </div>
            <p className="text-[#A3A3A3] text-sm">
              © 2024 BLOGGER_OS — CODE_WITH_♥️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
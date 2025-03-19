// src/pages/CreateBlog.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { blog_categories } from "../assets/Constants";

interface postType {
  title: string;
  content: string;
  category: string[];
}

const CreateBlog = () => {
  const [formData, setFormData] = useState<postType>({
    title: "",
    content: "",
    category: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your submission logic here
    console.log("Form submitted:", formData);
  };

  const mainCategories = blog_categories.map(cat => cat[0]);

  const handleCategoryAdd = (value: string) => {
    if (!value) return;
    
    setFormData(prev => ({
      ...prev,
      category: prev.category.includes(value) 
        ? prev.category 
        : [...prev.category, value]
    }));
  };

  const handleCategoryRemove = (categoryToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.filter(cat => cat !== categoryToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E5E5] font-mono">
      <nav className="border-b border-[#404040] py-4 px-6 lg:px-12">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="font-pixel text-2xl text-[#d4a373] hover:text-[#E6B280] transition-colors">
            BLOGGER_OS
          </Link>
          <div className="flex items-center gap-6">
            <button className="text-[#A3A3A3] hover:text-[#d4a373] transition-colors">
              SAVE_DRAFT
            </button>
            <div className="w-10 h-10 rounded-full bg-[#d4a373]/20 border border-[#d4a373] flex items-center justify-center">
              <span className="text-[#d4a373] font-pixel">LV27</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          <div className="space-y-8">
            <h1 className="font-pixel text-4xl text-[#d4a373] mb-8">
              NEW_BLOG_POST
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-[#A3A3A3] text-sm mb-2">
                  POST_TITLE
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-3 text-[#E5E5E5] focus:outline-none focus:border-[#d4a373] transition-colors"
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className="block text-[#A3A3A3] text-sm mb-2">
                  CATEGORY
                </label>
                <select
                  value=""
                  onChange={(e) => handleCategoryAdd(e.target.value)}
                  className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-3 text-[#E5E5E5] focus:outline-none focus:border-[#d4a373] appearance-none"
                >
                  <option >Select a category</option>
                  {mainCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.category.map((cat) => (
                    <div 
                      key={cat} 
                      className="px-3 py-1 rounded-full bg-[#d4a373]/20 text-[#d4a373] flex items-center gap-2"
                    >
                      <span>{cat}</span>
                      <button
                        type="button"
                        onClick={() => handleCategoryRemove(cat)}
                        className="hover:text-[#E6B280] text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#A3A3A3] text-sm mb-2">
                  CONTENT
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full h-96 bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-3 text-[#E5E5E5] focus:outline-none focus:border-[#d4a373] transition-colors resize-none"
                  placeholder="Write your masterpiece..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#d4a373] text-[#1A1A1A] font-pixel px-8 py-3 rounded-lg hover:bg-[#E6B280] transition-colors"
                >
                  PUBLISH_POST
                </button>
                <button
                  type="button"
                  className="border border-[#404040] text-[#A3A3A3] px-8 py-3 rounded-lg hover:border-[#d4a373] hover:text-[#d4a373] transition-colors"
                >
                  DISCARD
                </button>
              </div>
            </form>
          </div>

          <div className="bg-[#2D2D2D] border-l hidden md:block  border-[#404040] p-4 space-y-8">
            <h2 className="font-pixel text-2xl text-[#d4a373]">PREVIEW</h2>
            
            <div className="space-y-6 overflow-y-auto max-h-[100vh]">
              <h3 className="text-xl font-semibold text-[#E5E5E5]">
                {formData.title || "Untitled Post"}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-[#A3A3A3] text-sm">
                {formData.category.map((cat) => (
                  <span 
                    key={cat} 
                    className="px-3 py-1 rounded-full bg-[#d4a373]/20 text-[#d4a373]"
                  >
                    {cat}
                  </span>
                ))}
                <span>DRAFT PREVIEW</span>
              </div>

              <p className="prose  max-w-none text-[#A3A3A3] ">
                {formData.content || "Start writing to see the preview..."}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#404040] mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="flex justify-between text-[#A3A3A3] text-sm">
            <span>AUTO-SAVE: ACTIVE</span>
            <span>LAST SAVED: 2:45 PM</span>
            <span>DRAFT ID: #BLG-127</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateBlog;
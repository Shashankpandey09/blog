// src/pages/SingleBlog.tsx
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BlogStore } from "../store/Blogs";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiTag, FiUser } from "react-icons/fi";
import { BlogsTYPE } from "./BlogsPages";
import { createPost } from "../store/Post";
import { useAuthStore } from "../store/User";
import BasicLoader from "../Components/BasicLoader";

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { blogs, getBlogs } = BlogStore.getState();
  const blog:BlogsTYPE|undefined = blogs?.find((b:BlogsTYPE) => b.id === Number(id));
  const {del,loading}=createPost();
  const {userId}=useAuthStore();
  const navigate=useNavigate()
  
  useEffect(() => {
    if (!blogs) getBlogs();
  }, []);
  const handleDel=async()=>{
  const success=  await del(id);
  if (success) navigate('/blogs')

  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-[#E5E5E5] font-mono flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-[#d4a373] mb-4">404</h1>
          <p className="text-[#A3A3A3]">Blog post not found</p>
          <Link
            to="/blogs"
            className="mt-6 inline-block text-[#d4a373] hover:text-[#E6B280] transition-colors"
          >
            ← Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  const readTime = blog && Math.ceil(blog.content?.length / 180);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E5E5] font-mono">
      <nav className="border-b border-[#404040] py-4 px-6 lg:px-12 sticky top-0 bg-[#1A1A1A]/95 backdrop-blur z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link
            to="/"
            className="font-pixel text-2xl text-[#d4a373] hover:text-[#E6B280] transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="inline-block" />
            DEV_ARCADE
          </Link>
          <div className="flex items-center space-x-8">
            <div className="w-10 h-10 rounded-full bg-[#d4a373]/20 border border-[#d4a373] flex items-center justify-center">
              <span className="text-[#d4a373] font-pixel">LV27</span>
            </div>
          </div>
        </div>
      </nav>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6 lg:px-12 py-12"
      >
        <article className="space-y-8">
          <header className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 text-[#A3A3A3] text-sm"
            >
              <span className="flex items-center gap-1">
                <FiUser className="text-[#d4a373]" />
                { "Anonymous Coder"}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="text-[#d4a373]" />
                {readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <FiTag className="text-[#d4a373]" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
             {blog?.authorId==userId &&  <button onClick={handleDel} className="bg-[#d4a373] text-[#1A1A1A] font-pixel px-8 py-1  rounded-md hover:bg-[#E6B280] transition-colors flex items-center justify-center gap-2" ><BasicLoader loading={loading} label={"DELETE"}/></button>}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-pixel text-4xl text-[#d4a373] leading-tight"
            >
              {blog.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {blog.tags.map((tag:{tagName:string}) => (
                <span
                  key={tag.tagName}
                  className="px-3 py-1 rounded-full text-sm bg-[#d4a373]/20 text-[#d4a373]"
                >
                  #{tag.tagName}
                </span>
              ))}
            </motion.div>
          </header>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="prose prose-invert max-w-none text-[#E5E5E5]"
          >
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="space-y-6 text-pretty text-justify"
            />  
          </motion.section>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8 border-t border-[#404040] mt-12"
          >
            <Link
              to="/"
              className="text-[#d4a373] hover:text-[#E6B280] transition-colors flex items-center gap-2"
            >
              <FiArrowLeft />
              Back to All Posts
            </Link>
          </motion.footer>
        </article>
      </motion.main>

      <footer className="border-t border-[#404040] mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="text-center text-sm text-[#A3A3A3]">
            <p>© 2024 DEV_ARCADE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
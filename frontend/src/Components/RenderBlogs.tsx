
import { Link } from "react-router-dom";
import { BlogsTYPE } from "../Pages/BlogsPages";



const RenderBlogs = ({ blog }: { blog: BlogsTYPE } ) => {

  return (
    <article
      
      className="group relative bg-[#2D2D2D] rounded-xl border border-[#404040] hover:border-[#d4a373] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="p-6 space-y-4">
        <div className="flex justify-between gap-2 items-start">
          {(blog.tags ?? []).map((tag:{tagName:string}) => (
            <span
            key={tag.tagName}
              className={`px-3 py-1  rounded-full text-sm  bg-[#d4a373]/20 text-[#d4a373] `}
            >
              {tag.tagName}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold leading-snug">{blog.title}</h2>

        {/* <p className="text-[#A3A3A3] line-clamp-3">
                      {blog.excerpt}
                    </p> */}

        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-[#d4a373]">
            {Math.ceil(blog.content?.length / 180)} min READ
            <br />
            <h6 className="text-[#A3A3A3] text-sm">
              {blog.createdAt.split("T")[0]}
            </h6>
          </span>
          <br />

          <Link
            to={`/blog/${blog.id}`}
            className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#d4a373] transition-colors"
          >
            <span className="font-pixel">VIEW</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
export default RenderBlogs;

// ${
//     blog.category === 'Engineering'
//       ?
//       : blog.category === 'Design'
//       ? 'bg-[#A3A3A3]/20 text-[#A3A3A3]'
//       : 'bg-[#404040] text-[#E5E5E5]'
//   }

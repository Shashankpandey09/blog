import useVisiblePages from "../hooks/pagination_hook";
import { PageStore } from "../store/Pagination"

const PaginationComp = () => {
    const {currentPage,hasNext_Page,hasPrev_Page,totalPage,setCurrent_page,next_Page,prev_page}=PageStore();
    const getVisiblePages=useVisiblePages()
const VisiblePages=getVisiblePages();
console.log(hasNext_Page,hasPrev_Page)

  return (
      <>   
      <button disabled={!hasPrev_Page} onClick={()=>prev_page()} className={`text-[#d4a373] font-bold text-2xl ${hasPrev_Page?" ":"hidden"} cursor-pointer `}>{`<`}</button>
           {VisiblePages.map((page) => (
                   page==="..."?
                   <span key={page}>...</span>:( 
                    totalPage!==1 &&
                    <button
                    onClick={()=>setCurrent_page(Number(page))}
                      key={page}
                      className={`px-4 py-2 rounded-lg ${
                        page === currentPage
                          ? "bg-[#d4a373] text-[#1A1A1A]"
                          : "bg-[#2D2D2D] text-[#A3A3A3] hover:bg-[#404040]"
                      } transition-colors`}
                    >
                      {page}
                    </button>)
                  ))}
                  <button disabled={!hasNext_Page} onClick={()=>next_Page()} className={`text-[#d4a373] font-bold text-2xl ${hasNext_Page?" ":"hidden"} cursor-pointer`}>{`>`}</button>
 </>
  )
}
export default PaginationComp
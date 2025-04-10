import { useCallback } from "react";
import { PageStore } from "../store/Pagination";

const useVisiblePages=(()=>{
    const {currentPage,totalPage}=PageStore();
    console.log(totalPage,currentPage)
const getVisiblePages=useCallback(()=>{

    const visiblePages:(number|string)[]=[];
//show first and last page
//total pages less<=5 to display all
if(totalPage<=5){
    for(let start=1;start<=totalPage;start++){
        visiblePages.push(start);
    }
}
else{
 //put the first page
 visiblePages.push(1);
 //checking wether the gap between the first page and current page is >4
 if(currentPage>4){
    visiblePages.push("...");
 }
 // figuring out the ellipsis combination for pages current-1,current,current+1
 const start =Math.max(2,currentPage-1);
 const end=Math.min(totalPage-1,currentPage+1);
 //putting it in the array
 for(let i=start;i<=end;i++){
    visiblePages.push(i);
 }
 //putting ... in the before the last page if distance between the current page and total page >3
 if(totalPage-3>currentPage){
    visiblePages.push("...");
 }
 visiblePages.push(totalPage);
}
return visiblePages;
},[currentPage,totalPage])
return getVisiblePages;
})
export default useVisiblePages
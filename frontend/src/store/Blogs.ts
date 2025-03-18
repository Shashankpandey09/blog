import axios from "axios";
import { create } from "zustand";


interface BlogsType{
    blogs:Array<object>,
    loading:Boolean,
    getBlogs:()=>Promise<void>
}
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
export const BlogStore=create<BlogsType>((set)=>({
    blogs:[],
    loading:false,
    getBlogs:async()=>{
        try {
            set({loading:true});
            const res=await axios.get(`${BACKEND_URL}/blogs`)
            set({blogs:res.data,loading:false})
        } catch (error) {
            
        }
    }
}))

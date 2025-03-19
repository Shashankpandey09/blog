import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "./User";


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
            const token=useAuthStore.getState().token
            const res=await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                headers:{
                    "Content-Type":"application/json",
                    'Authorization':`Bearer ${token}`
                }
            })
            set({blogs:res.data.response.blogs,loading:false})
        } catch (error) {
            
        }
    }
}))

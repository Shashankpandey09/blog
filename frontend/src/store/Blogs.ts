import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "./User";
import { BlogsTYPE } from "../Pages/BlogsPages";



interface BlogsType{
    blogs:null|BlogsTYPE[]
    loading:Boolean,
    lastFetched:number,
    data:any,
    getBlogs:(signal?:AbortSignal)=>Promise<void>,
    invalidate:()=>void
}
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
export const BlogStore=create<BlogsType>((set)=>({
    blogs:null,
    loading:false,
    lastFetched:0,
    data:null,
    getBlogs:async(signal)=>{
        try {
            set({loading:true});
            const token=useAuthStore.getState().token
            const res=await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                signal,
                headers:{
                    "Content-Type":"application/json",
                    'Authorization':`Bearer ${token}`
                }
            })
            set({blogs:res.data.response.blogs,loading:false,lastFetched:Date.now(),data:res.data})
            
         
        } catch (error) {
            
        }
    },
    invalidate:()=>{
        set({lastFetched:0});
    }
}))

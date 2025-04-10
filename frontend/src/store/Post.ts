import {create} from 'zustand'
import axios from 'axios'
import { useAuthStore } from './User'
import { blogSchemaType } from '@shashankpandey/blogscommon'
import { ToastStore } from './Toast'
import { BlogStore } from './Blogs'
import { PageStore } from './Pagination'


interface someMOre  {
    loading:boolean,
    error:string|null,
    status:number|null,
    post:(payload:blogSchemaType)=>Promise<boolean>,
    del:(payload:string|undefined)=>Promise<boolean>
}

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
export const createPost=create<someMOre>((set)=>({
    loading:false,
    error:null,
    status:null,
    success:false,
    post:async(payload)=>{
        set({loading:true})
        try {
          const res=  await axios.post(`${BACKEND_URL}/api/v1/blog`,payload,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${useAuthStore.getState().token}`
                }
                
            })
            set({loading:false,status:res.status})
            PageStore.getState().setCurrent_page(1);
            ToastStore.getState().showToast({message:'Post Created Successfully ',variant:'success',duration:3000})
            return true;
            
        } catch (error:any) {
            set({loading:false,error:error.message,status:error.response?.status||500}) 
              return false;
        }
    },
    del:async(payload)=>{
        set({loading:true})  
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${payload}`,{
                headers:{
                    "Content-Type":"Application/json",
                    'Authorization':`Bearer ${useAuthStore.getState().token}`
                }
               
            }
            
        )
        set({loading:false})
        ToastStore.getState().showToast({message:'Post Deleted Successfully',variant:'success',duration:3000})
        BlogStore.setState({lastFetched:0});

        
        return true;
        } catch (error) {
            set({loading:false})
           
            ToastStore.getState().showToast({message:'error occurred',variant:'error',duration:3000})
            return false;
           
        }
    }
}
))
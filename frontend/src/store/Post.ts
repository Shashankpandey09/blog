import {create} from 'zustand'
import axios from 'axios'
import { useAuthStore } from './User'
import { blogSchemaType } from '@shashankpandey/blogscommon'
interface someMOre  {
    loading:boolean,
    error:string|null,
    status:number|null
    post:(payload:blogSchemaType)=>Promise<boolean>
}
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
export const createPost=create<someMOre>((set)=>({
    loading:false,
    error:null,
    status:null,
    post:async(payload)=>{
        set({loading:true})
        try {
          
            const token=useAuthStore.getState().token
          const res=  await axios.post(`${BACKEND_URL}/api/v1/blog`,payload,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
                
            })
            set({loading:false,status:res.status})
            return true;
            
        } catch (error:any) {
            set({loading:false,error:error.message,status:error.response?.status||500}) 
              return false;
        }
    }
}
))
import { create } from "zustand";
import { userSignInSchemaType, userSignUpSchemaType } from "@shashankpandey/blogscommon";
import axios from "axios";
interface authStore{
    token:string|null;
    loading:boolean;
SignUp:(payload:userSignUpSchemaType)=>Promise<void>;
login:(payload:userSignInSchemaType)=>Promise<void>
logout:()=>void
}
const BACKEND_URL:string=import.meta.env.VITE_BACKEND_URL

export const useAuthStore=create<authStore>((set)=>({
    token:null,
    loading:false,
    
    SignUp:async(payload)=>{
        try {
            set({loading:true})
            const res=await axios.post(`${BACKEND_URL}/api/v1/user/signup`,payload)
            const data=res.data;
            console.log(data)
            set({token:data.token,loading:false})

        } catch (error:any) {

         console.log('error usermight',error.message)
        }
    },
    login:async(payload)=>{
        try {
            set({ loading: true,});
            const res=await axios.post(`${BACKEND_URL}/api/v1/user/signin`,payload)
            const data=res.data;
            set({token:data.token,loading:false})
        } catch (error:any) {
         console.log('error',error.message)
         set({loading:false})
        }
    },
    logout:()=>set({token:null,loading:false})

}))


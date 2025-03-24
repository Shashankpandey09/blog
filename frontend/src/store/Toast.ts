import {create} from 'zustand'

type ToastVar = "success" | "error" | "info";
type toastConf={
  message: string|null;
  variant: ToastVar;
  duration: number;
}
interface toastFunc{
    toast:toastConf
    showToast:(toast:toastConf)=>void
    clearToast:()=>void,
}
export const ToastStore=create<toastFunc>((set)=>({
    toast:{message:null,variant:'info',duration:0},
    showToast:(toast)=>{
        set({toast:{message:toast.message,variant:toast.variant,duration:toast.duration}})
    },
    clearToast:()=>{set({ toast:{message:null,variant:'info',duration:0}})}
}))

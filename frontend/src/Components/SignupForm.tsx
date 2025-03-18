import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LabelInputs from "./Labelnput";
import { userSignInSchemaType, userSignUpSchemaType } from "@shashankpandey/blogscommon";
import { useAuthStore } from "../store/User";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
const SignupForm = ({ type }: { type: 'signup' | 'signin' }) => {
  const [inputs, setInputs] = useState<userSignUpSchemaType | userSignInSchemaType>({
    name: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();
const {token,loading,SignUp,login}=useAuthStore();
useEffect(()=>{
  if (token?.length!==0 && token!=null){
    navigate('/blogs');
  }
},[token])
  const handleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
      type=="signup"?await SignUp(inputs):await login(inputs);
     
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev:userSignUpSchemaType) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="h-screen bg-[#1A1A1A] flex items-center justify-center relative p-6">
      {loading && <Loader/>}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-[#2D2D2D] border-2 border-[#404040] rounded-xl p-8 hover:border-[#d4a373] transition-colors">
          <div className="space-y-1 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#d4a373] animate-pulse" />
              <h1 className="font-pixel text-2xl text-[#E5E5E5]">
                {type === 'signup' ? 'CREATE_ACCOUNT' : 'ACCESS_PORTAL'}
              </h1>
            </div>
            <p className="text-[#A3A3A3] font-mono text-sm">
              {type === 'signup' 
                ? 'Join the developer collective' 
                : 'Welcome back, operator'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'signup' && (
              <LabelInputs
                label="username"
                name="name"
                placeholder="Enter your alias"
                inputClassName="bg-[#333333] text-[#E5E5E5] border-2 border-[#404040] focus:border-[#d4a373] font-mono"
                OnChange={handleChange}
                
              />
            )}

            <LabelInputs
              label="email"
              name="email"
              type="email"
              placeholder="operator@domain.com"
              inputClassName="bg-[#333333] text-[#E5E5E5] border-2 border-[#404040] focus:border-[#d4a373] font-mono"
              OnChange={handleChange}
             
            />

            <LabelInputs
              label="password"
              name="password"
              type="password"
              placeholder="••••••••"
              inputClassName="bg-[#333333] text-[#E5E5E5] border-2 border-[#404040] focus:border-[#d4a373] font-mono"
              OnChange={handleChange}
           
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#d4a373] hover:bg-[#E6B280]  text-[#1A1A1A] font-pixel py-3 rounded-lg 
             ${loading?'opacity-50 cursor-not-allowed':''} transition-all hover:translate-y-[-2px] shadow-lg hover:shadow-[#d4a373]/20`}
            >
              {type === 'signup' ? 'ACTIVATE_ACCOUNT' : 'INITIATE_LOGIN'}

            </button>

            <p className="text-center text-[#A3A3A3] font-mono text-sm">
              {type === 'signup' ? 'Already registered? ' : 'New operator? '}
              <Link
                to={type === 'signup' ? '/signin' : '/signup'}
                className="text-[#d4a373] hover:text-[#E6B280] underline"
              >
                {type === 'signup' ? 'AUTHENTICATE_HERE' : 'REQUEST_ACCESS'}
              </Link>
            </p>
          </form>
        </div>

        {/* Visual Section */}
        <div className="hidden lg:flex flex-col justify-between bg-[#2D2D2D]/50 border-2 border-[#404040] rounded-xl p-8">
          <div className="space-y-4">
            <div className="w-fit p-4 rounded-lg bg-[#d4a373]/10 border border-[#d4a373]">
              <span className="font-pixel text-4xl text-[#d4a373]">🛸</span>
            </div>
            <h2 className="font-pixel text-2xl text-[#E5E5E5]">
              Developer Nexus
            </h2>
          </div>

          <div className="space-y-4 border-t border-[#404040] pt-6">
            <div className="flex gap-4">
              <div className="flex-1 bg-[#333333] p-4 rounded-lg border-2 border-[#404040]">
                <h3 className="font-pixel text-[#d4a373] mb-2">12k+</h3>
                <p className="text-[#A3A3A3] font-mono text-sm">Developers</p>
              </div>
              <div className="flex-1 bg-[#333333] p-4 rounded-lg border-2 border-[#404040]">
                <h3 className="font-pixel text-[#d4a373] mb-2">127k+</h3>
                <p className="text-[#A3A3A3] font-mono text-sm">Posts</p>
              </div>
            </div>
            
            <p className="text-[#A3A3A3] font-mono text-sm leading-relaxed">
              Join our network of developers creating meaningful content and 
              pushing the boundaries of technical communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignupForm;

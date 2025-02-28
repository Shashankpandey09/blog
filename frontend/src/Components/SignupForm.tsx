import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import LabelInputs from "./Labelnput";
import { userSignInSchemaType, userSignUpSchemaType } from "@shashankpandey/blogscommon";
const SignupForm = ({type}:{type:'signup'|'signin'}) => {
  const [Inputs, setInputs] = useState<userSignUpSchemaType|userSignInSchemaType>({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Inputs,e.target);
    
  };
  return (
    <section className="bg-gray-50  dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        {/* Form Container */}
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 sm:max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* Form Title */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {type==='signup'?'Create Your Account':'Login To Your Account'}
            </h1>

            {/* Form */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* name Input */}
             {type==='signup'&& <div>
                <LabelInputs
                  label={"name"}
                  placeholder={"Enter Your name"}
                  OnChange={(e) => {
                    setInputs((Inputs: userSignUpSchemaType) => ({
                      ...Inputs,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>}
              {/* Email Input */}
              <div>
                <LabelInputs
                  label={"email"}
                  type={"email"}
                  placeholder={"@gmail.com"}
                  OnChange={(e) => {
                    setInputs((Inputs: userSignUpSchemaType) => ({
                      ...Inputs,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>

              {/* Password Input */}
              <div>
                <LabelInputs
                  label={"password"}
                  type={"password"}
                  placeholder={"********"}
                  OnChange={(e) => {
                    setInputs((Inputs: userSignUpSchemaType) => ({
                      ...Inputs,
                      password: e.target.value,
                    }));
                  }}
                />
              </div>

              {/* Terms and Conditions Checkbox */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white bg-[#FF6B6B] hover:bg-[#FF5A5A] focus:ring-4 focus:outline-none focus:ring-[#FF6B6B] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#FF6B6B] dark:hover:bg-[#FF5A5A] dark:focus:ring-[#FF6B6B]"
              >
               {type==='signup'?'Create An Account ': 'Login '}
              </button>

              {/* Login Link */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
             {type==='signup'?`   Already have an account?${" "}`:`Create An Account ${" "}`}
                <Link
                  to={type==='signup'?'/signIn':'/signup'}
                  className="font-medium text-[#FF6B6B] hover:underline dark:text-[#FF6B6B]"
                >
                 {type==='signup'?'SignIn':"Signup"}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignupForm;

import Quotes from "../Components/Quotes"
import SignupForm from "../Components/SignupForm"

const SignIn = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
    <SignupForm type={"signin"}/>
    <div className="hidden lg:block">
    <Quotes/>
    </div>
    
</div>
  )
}
export default SignIn
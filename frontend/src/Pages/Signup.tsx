import Quotes from "../Components/Quotes"
import SignupForm from "../Components/SignupForm"

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <SignupForm type={"signup"}/>
        <div className="hidden lg:block slide-in ">
        <Quotes/>
        </div>
        
    </div>
  )
}
export default Signup
import Quotes from "../Components/Quotes"
import SignupForm from "../Components/SignupForm"

const Signup = () => {
  return (
    <div className="bg-[#1A1A1A]  font-pixel  ">
        <SignupForm type={"signup"}/>
        {/* <div className="hidden lg:block slide-in">
            <Quotes/>
        </div> */}
    </div>
)
}
export default Signup
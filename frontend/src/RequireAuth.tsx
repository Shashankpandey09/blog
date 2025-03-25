import { Outlet,Navigate } from "react-router-dom"
import { useAuthStore } from "./store/User"
const RequireAuth = () => {
    const token=useAuthStore.getState().token;
    return token?<Outlet/>:<Navigate to={'/signin'} replace/>
}
export default RequireAuth
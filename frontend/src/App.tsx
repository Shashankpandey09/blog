import { BrowserRouter,Routes,Route } from "react-router-dom"
import {Signup,SignIn,Blog} from './Pages/index'
function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

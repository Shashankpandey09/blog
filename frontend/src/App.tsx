import { BrowserRouter,Routes,Route } from "react-router-dom"
import {Signup,SignIn,Blog} from './Pages/index'
import Homepage from "./Pages/Home"
import Blogs from "./Pages/BlogsPages"
import CreateBlog from "./Pages/Create"
function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Homepage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/create" element={<CreateBlog/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter,Routes,Route } from "react-router-dom"
import {Signup,SignIn,Blog,Homepage,BlogsPages,CreateBlog} from './Pages/index'


function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<Signup/>}/>
       <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/blogs" element={<BlogsPages/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/create" element={<CreateBlog/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

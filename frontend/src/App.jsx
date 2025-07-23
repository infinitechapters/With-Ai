import { Route, Routes } from "react-router-dom"
import CreateArticle from "./pages/CreateArticle"
import Dashboard from "./pages/Dashboard"
import GenImage from "./pages/GenImage"
import GenTitle from "./pages/GenTitle"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { ToastContainer} from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ai' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='create-article' element={<CreateArticle/>}/>
        <Route path='gen-titles' element={<GenTitle/>}/>
        <Route path='gen-images' element={<GenImage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

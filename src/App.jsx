import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import BorS from './pages/BorS'
import Register from './pages/register'
import Sregister from './pages/Sregister'
import Login from './pages/login'
import User_view from './pages/User_view'
import Seller_view from './pages/Seller_view'
import  Uproduct from './pages/Uproduct'
import Sproduct from './pages/addProduct'
import Nearest from './pages/nearest_providers'
import './App.css'
const App=()=>{
    return(
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/home" element={<BorS/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/Sregister" element={<Sregister/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/User_view" element={<User_view/>}/>
                    <Route path="/Seller_view" element={<Seller_view/>}/>
                    <Route path="/Uproduct/:shopName" element={<Uproduct/>} />
                    <Route path="/addProduct" element={<Sproduct/>}/>
                    <Route path="/nearest" element={<Nearest/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App
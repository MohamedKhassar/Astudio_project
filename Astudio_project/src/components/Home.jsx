import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./Users";
import Products from "./Products";
import { UserContext } from "../Contexts/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [users,setUsers]=useState([ ])
    const [products,setProducts]=useState([ ])
    const rows = [5, 10, 20, 50]
    const [limit,setLimit]=useState(5)
    const [pag,setPag]=useState(3)
    const [skip,setSkip]=useState(0)
    
    useEffect(()=>{
        async function getData(){
           await axios.get(`https://dummyjson.com/users?limit=12`).then(data=>setUsers(data.data))
           
        }
        getData()
    },[])
    useEffect(()=>{
        async function getData(){
           await axios.get(`https://dummyjson.com/products?limit=12`).then(data=>setProducts(data.data))
        //    setPag(Math.ceil(users.users.length/12))
        }
        getData()
    },[])
    
    
    if (window.location.pathname==="/") {
        
        window.location.replace('/users')
    }
    
    return (
        <UserContext.Provider value={{ users ,setUsers,rows,limit,setLimit,pag,setPag,products,setProducts,skip,setSkip}}>
        <BrowserRouter>
            <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    );
}

export default Home;

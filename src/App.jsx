import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Profile } from "./pages/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [orders, setOrders] = useState([]);

  const getClients = async () =>{
    const res = await axios.get('http://localhost:8080/clients');
    setOrders(res.data);
  }
  useEffect(()=>{
    getClients();
  },[])
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard orders={orders}/>} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/user/:id" element={<Profile />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;

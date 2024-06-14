import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Profile } from "./pages/dashboard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        {/* <Route path="/dashboard/orders" element={<Navigate to="/dashboard/orders/new" />} /> */}
        {/* <Route path="/dashboard/shipped" element={<Navigate to="/dashboard/shipped/intransit" />} /> */}
        {/* <Route path="/dashboard/rto" element={<Navigate to="/dashboard/rto/rtointransit" />} /> */}
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/clients/:id" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;

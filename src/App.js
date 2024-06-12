import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./component/Login";
import Admin from "./component/admin/Admin";
import SignInContainer from "./component/Sign/SignInContainer";
import { AuthProvider } from "./component/Routers/AuthContext";
import PageNotFound from "./component/PageNotFound";
import PrivateRoute from "./component/Routers/PrivateRoute";

function App() {
  //  const nav = useNavigate()
  return (
    <BrowserRouter >
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='*' element={<PageNotFound />} />

          {/* <Route path="/admin/*" element={<Admin />} /> */}
          <Route path='/admin/*' element={<PrivateRoute allowedRoles="admin">
            <Admin />
          </PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
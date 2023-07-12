import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/login";
import Home from "./page/home";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./page/register";
import AddData from "./page/addData";
import DetailData from "./page/detailData";
import UpdateData from "./page/updateData";
import Profile from "./page/profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<AddData />} />
            <Route path="/detail/:id" element={<DetailData />} />
            <Route path="/update/:id" element={<UpdateData />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

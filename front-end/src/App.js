import "./App.css";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./component/SignUp";
import PrivateComponent from "./component/PrivateComponent";
import Login from "./component/Login";
import AddProduct from "./component/AddProduct";
import ProductsList from "./component/ProductsList";
import UpdateProduct from "./component/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductsList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>

          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

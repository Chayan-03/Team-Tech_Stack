import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ChatBot from "./pages/Help";
import Buy from "./pages/shop/Buy";
import Sell from "./pages/shop/Sell";
import Rent from "./pages/shop/Rent";
import List from "./pages/shop/List";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import "./i18";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/help" element={<ChatBot />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/find" element={<Jobs />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/shop/buy" element={<Buy />}></Route>
        <Route path="/shop/sell" element={<Sell />}></Route>
        <Route path="/shop/rent" element={<Rent />}></Route>
        <Route path="/shop/list" element={<List />}></Route>
        <Route path="*" element={<Login />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

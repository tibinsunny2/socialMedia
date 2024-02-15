import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Navebar from "./components/Navebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import Createpost from "./components/screens/Createpost";
import { reducer, initialState } from "./reducers/userReducer";
import UserProfile from './components/screens/UserProfile'
// implementing the context methode to the project
export const UserContext = createContext();
// creating separate routing component in app.js.....the reasone is the routes inside the browser wrap only can access inside the wrap but we need all the datas and the histories just outside the wrap so creating separate element for the app.js
const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/Profile" element={<Profile />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Createpost" element={<Createpost />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
    </Routes>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navebar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;

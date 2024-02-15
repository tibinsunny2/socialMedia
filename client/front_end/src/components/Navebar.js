import React, { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Navebar() {
  const { state, dispatch } = useContext(UserContext);
  const navigation=useNavigate()
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/Profile">Profile</Link>
        </li>,
        <li>
          <Link to="/Createpost">Createpost</Link>
        </li>,
         <li>
          <button
          className="btn #e53935 red darken-1"
          onClick={() =>{
            localStorage.clear()
            dispatch({type:"CLOSE"})
            navigation('/login')
          } }
        >
          Logout
        </button>
       </li>,
      ];
    } else {
     return[
      <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>
     ]
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white" style={{ color: "black" }}>
        <Link to={state?"/":"/signup"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
}

export default Navebar;

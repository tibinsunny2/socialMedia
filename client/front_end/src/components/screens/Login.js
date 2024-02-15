import React, { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../App";
function Login() {
  const {state,dispatch}=useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const postData = () => {
    // we need to validate the email using ajax javascript 
    if(!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email) 
    ){
      M.toast({ html: "invalid email", classes: "#f44336 red" });
      return
    }
    fetch("/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 
        if (data.error) {
          M.toast({ html: data.error, classes: "#f44336 red" });
        } else {
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          M.toast({ html:"login success" , classes: "#00e676 green accent-3" });
          navigate("/");
        }
      }).catch(err=>{
        console.log(err);
      })
  };
  return (
    <div class="myCard">
      <div class="card auth-card input-field">
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="btn waves-effect waves-light #1e88e5 blue darken-1"
          onClick={() => postData()}
        >
          Login
        </button>
        <h5>
          <Link to="/Signup">Don't have an account??</Link>
        </h5>
      </div>
    </div>
  );
}

export default Login;

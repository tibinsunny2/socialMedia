import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
function Profile() {
  const [pics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
        console.log(pics);
      });
  }, []);
  return (
    <div className="home">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "2px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
          />
        </div>
        <div>
          <h4>{state?state.name:null}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "109%",
            }}
          >
            <h5>4o posts</h5>
            <h5>4o posts</h5>
            <h5>4o posts</h5>
          </div>
        </div>
      </div>
      <div className="gallery">
        {pics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.pic}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;

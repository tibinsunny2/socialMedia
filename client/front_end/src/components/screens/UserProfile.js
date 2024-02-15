import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams, useRouteLoaderData } from "react-router-dom";
function Profile() {
  const [persone, setPersone] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  useEffect(() => {
    console.log("hqqqqq");
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPersone(res);
      });
  }, []);
  const followUser = () => {
   
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
     
        dispatch({
          type: "UPDATE",
          payload: { following: persone.following, followers: persone.followers },
        });
        localStorage.setItem("User", JSON.stringify(result));
        console.log(result);
        setPersone(result)
      });
   
  };
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
          <h4>{persone ? persone.user.name : "loading..."}</h4>
            <h5>{persone ? persone.user.email : "loading..."}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "109%",
            }}
          >
            <h5>{persone ? persone.posts.length : "loading..."} posts</h5>
            <h5>
              {persone ? persone.user.followers.length : "loading.....!"}{" "}
              following
            </h5>
            <h5>
              {persone ? persone.user.following.length : "loading.....!"}{" "}
              followers
            </h5>
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #1e88e5 blue darken-1"
          onClick={() => followUser()}
        >
          Follow
        </button>
      </div>
      <div className="gallery">
        {persone
          ? persone.posts.map((item) => {
              return (
                <img
                  key={item._id}
                  className="item"
                  src={item.pic}
                  alt={item.title}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Profile;

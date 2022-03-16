import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
function Log() {
  const history = useHistory()
  let flag = false
  const [data, saveData] = useState({
    email: "",
    password: "",

  })
  let go = () => {
    var myData = localStorage.getItem("User_Data")
    if (!myData) {
      history.push('/sign')
      alert("Sign In First")
    } else {
      var usersData = JSON.parse(myData)
      for (var i = 0; i < usersData.length; i++) {
        if (data.email === usersData[i].email && data.password === usersData[i].password) {
          alert("Login In Successfully")
          history.push('/userProfile')
          flag = true
        }
      }
      if (!flag) {
        alert("Incorrect Email Or Password")
      }
    }
  }
  return (
    <div>
      <h1>Log In</h1>
      <input type="text" onChange={(e) => saveData({ ...data, email: e.target.value })} />
      <input type="password" onChange={(e) => saveData({ ...data, password: e.target.value })} />
      <button onClick={() => go()}>Go</button>
    </div>
  );
}

export default connect()(Log);
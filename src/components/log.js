import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
function Log(prop) {
  const history = useHistory()
  let flag = false
  const [logData, saveLogData] = useState({
    email: "",
    password: "",

  })
  let go = () => {
    var localLogData = localStorage.getItem("User_Data")
    if (!localLogData) {
      history.push('/sign')
      alert("Sign In First")
    } else {
      var usersData = JSON.parse(localLogData)
      for (var i = 0; i < usersData.length; i++) {
        if (logData.email === usersData[i].email && logData.password === usersData[i].password) {
          prop.dispatch({ type: "LOG_USER_DATA", payload:usersData[i] });
          localStorage.setItem("LoginUser", JSON.stringify(usersData[i]))
          alert("Login In Successfully")
          history.push('/home')
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
      <input type="text" onChange={(e) => saveLogData({ ...logData, email: e.target.value })} />
      <input type="password" onChange={(e) => saveLogData({ ...logData, password: e.target.value })} />
      <button onClick={() => go()}>Log In</button>
    </div>
  );
}

export default connect()(Log);
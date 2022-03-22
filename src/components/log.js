import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import '../log.css'
function Log(prop) {
  const history = useHistory()
  let flag = false
  const [logData, saveLogData] = useState({
    email: "",
    password: "",
    logPhoto:null
  })
console.log(logData);
  let go = () => {
    var localLogData = localStorage.getItem("User_Data")
    if (!localLogData) {
      history.push('/sign')
      alert("Sign In First")
    } else {
      var usersData = JSON.parse(localLogData)
      console.log(usersData);
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
    <div className="main">
      <h1>Log In</h1>
      <input placeholder="Email" type="text" onChange={(e) => saveLogData({ ...logData, email: e.target.value })} />
      <input  placeholder="Password" type="password" onChange={(e) => saveLogData({ ...logData, password: e.target.value })} />
      <input className="a" onChange={(e)=>saveLogData({...logData,logPhoto:URL.createObjectURL(e.target.files[0])})} type="file"/>
      <button onClick={() => go()}>Log In</button>
    </div>
  );
}

export default connect()(Log);
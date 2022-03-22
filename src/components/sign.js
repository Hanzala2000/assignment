import React, { useState } from "react";
import { connect } from "react-redux";

import '../sign.css'
import { useHistory } from 'react-router-dom'
function Sign(prop) {
    const history = useHistory()
    let flag = false
    const [signData, saveSignData] = useState({
        email: "",
        password: "",
        signPhoto:null
    })
    let go = () => {
        var localSignData = localStorage.getItem("User_Data")
        if (!localSignData) {

            let num = Math.floor(Math.random() * 100000)
            signData.id = num

            localStorage.setItem("User_Data", JSON.stringify([signData]))
            history.push('/log')
            alert("Signed")
        } else {
            var usersData = JSON.parse(localSignData)
            for (var i = 0; i < usersData.length; i++) {
                if (signData.email == usersData[i].email) {
                    alert("Email Already Registered Please Login")
                    history.push('/log')
                    flag = true
                }
            }
            if (!flag) {
                let num = Math.floor(Math.random() * 100000)
                signData.id = num
                usersData.push(signData)
                localStorage.setItem("User_Data", JSON.stringify(usersData))
                history.push('/log')
                alert("Sign In Successfully")
            }
        }
    }
    return (
        <div className="main">
            <h1>Sign In</h1>
            <input placeholder="Email" type="text" onChange={(e) => saveSignData({ ...signData, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => saveSignData({ ...signData, password: e.target.value })} />
            <input className="a" onChange={(e)=>saveSignData({...signData,signPhoto:URL.createObjectURL(e.target.files[0])})} type="file"/>
            <button  onClick={() => go()}>Sign Up</button>
        </div>
    );
}

export default connect()(Sign);
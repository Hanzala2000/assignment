import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
function Sign(prop) {
    const history = useHistory()
    let flag = false
    const [signData, saveSignData] = useState({
        email: "",
        password: "",

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
        <div>
            <h1>Sign In</h1>
            <input type="text" onChange={(e) => saveSignData({ ...signData, email: e.target.value })} />
            <input type="password" onChange={(e) => saveSignData({ ...signData, password: e.target.value })} />
            <button onClick={() => go()}>Sign Up</button>
        </div>
    );
}

export default connect()(Sign);
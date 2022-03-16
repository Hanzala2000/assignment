import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
function Sign(prop) {
    const history = useHistory()
    let flag = false
    const [data, saveData] = useState({
        email: "",
        password: "",
        
    })
    let go = () => {
        var myData = localStorage.getItem("User_Data")
        if (!myData) {
            
            let num= Math.random()*100000
            let num2 = Math.floor(num)
            data.id = num2

            prop.dispatch({ type: "SET_USER_DATA", email: data.email, password: data.password ,id:data.id});
            localStorage.setItem("User_Data", JSON.stringify([data]))
            history.push('/home')
            alert("Signed")
        } else {
            var usersData = JSON.parse(myData)
            for (var i = 0; i < usersData.length; i++) {
                if (data.email == usersData[i].email) {
                    alert("Already signed")
                    flag = true
                }
            }
            if (!flag) {
                usersData.push(data)
                localStorage.setItem("User_Data", JSON.stringify(usersData))
                prop.dispatch({ type: "SET_USER_DATA", email: data.email, password: data.password });
                history.push('/home')
                alert("Sign In Successfully")
            }
        }
    }
    return (
        <div>
            <h1>Sign In</h1>
            <input type="text" onChange={(e) => saveData({ ...data, email: e.target.value })} />
            <input type="password" onChange={(e) => saveData({ ...data, password: e.target.value })} />
            <button onClick={() => go()}>Go</button>
        </div>
    );
}

export default connect()(Sign);
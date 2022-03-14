import React, { useState } from "react";
import { connect } from "react-redux";
function Sign(prop) {
    let flag = false
    const [data, saveData] = useState({
        email: "",
        password: ""
    })
    // console.log(data)
    // console.log(prop)

    let go = () => {
        var myData = localStorage.getItem("User_Data")
        if (!myData) {
            localStorage.setItem("User_Data", JSON.stringify([data]))
            prop.dispatch({ type: "SET_USER_DATA", email: data.email, password: data.password });
            console.log("signed");
        } else {
            var usersData = JSON.parse(myData)
            for (var i = 0; i < usersData.length; i++) {
                if (data.email == usersData[i].email) {
                    console.log("Already signed")
                    flag = true
                }
            }
            if (!flag) {
                usersData.push(data)
                localStorage.setItem("User_Data", JSON.stringify(usersData))
                prop.dispatch({ type: "SET_USER_DATA", email: data.email, password: data.password });
                console.log("Sign In Successfully")
            }
        }
    }
    return (
        <div>
            <input type="text" onChange={(e) => saveData({ ...data, email: e.target.value })} />
            <input type="password" onChange={(e) => saveData({ ...data, password: e.target.value })} />
            <button onClick={() => go()}>Go</button>
        </div>
    );
}

export default connect()(Sign);

import React from "react";
import { connect } from "react-redux";

function Home(prop) {
    let storage = localStorage.getItem("User_Data")
    let parseStorage = JSON.parse(storage)
    // console.log(prop);
    return (
        <div>
            <h1>Home</h1>
            <h4>{prop.email}</h4>
            <h4>{prop.password}</h4>
            <h4>{prop.id}</h4>
            {/* <button onClick={()=>console.log(prop)}>Check</button> */}
        </div>
    );
}


const mapReduxStateToProps = (state) => {
    console.log(state);
    return {
        email:state.email,
        password:state.password,
        id:state.id
    }
};
export default connect(mapReduxStateToProps,null)(Home);

// export default connect(mapReduxStateToProps)(Home);;
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import '../home.css'
function Home(prop) {
    const[a,seta] = useState(false)
    let [postData, setPostData] = useState({
        postName: "",
        postDetail: "",
        postImgUrl: "",
        postPrice: ""
    })

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('LoginUser'));
        prop.dispatch({ type: "LOG_USER_DATA", payload: userData });

        let postData2 = JSON.parse(localStorage.getItem('postData'));
        prop.dispatch({ type: "POST_DATA_FROM_LS", payload: postData2 })
    }, [])

    let logOut = () => {
        localStorage.removeItem("LoginUser")
        window.location.reload()
    }

    let addPost = () => {
        console.log(postData);
        let post = { ...postData, postUserId: prop.id }
        let arr = []

        let oldPostData = localStorage.getItem("postData");
        if (oldPostData == null) {
            arr.push(post);
            localStorage.setItem("postData", JSON.stringify(arr));
            prop.dispatch({ type: "ADD_POST", payload: arr })
            seta(false)
        } else {
            let oldArr = JSON.parse(oldPostData);
            oldArr.push(post);
            localStorage.setItem("postData", JSON.stringify(oldArr));
            prop.dispatch({ type: "ADD_POST", payload: [post] })
            seta(false)
        }


    }
    let del = (i) => {
        let a = JSON.parse(localStorage.getItem("postData"))
        console.log(a);
        a.splice([i], 1)
        console.log(a);
        localStorage.setItem("postData", JSON.stringify(a))
        let postData2 = JSON.parse(localStorage.getItem('postData'));
        prop.dispatch({ type: "POST_DATA_FROM_LS", payload: postData2 })
    }
    let check =()=>{
        if(!a){

            seta(true)
        }else{
            seta(false)
        }
    }
    return (
        <div>
            <div className="one">
                <span>
                    <Link to='./userProfile'><img src={prop.photo} /></Link>
                    <Link className="b" to='./userProfile'>Profile</Link>
                </span>
                <button onClick={() => logOut()}>Log Out</button>
            </div>
            <div className="two">
                <Link className="twos" to="/home">Home</Link>
                <Link className="twos" to="userProfile">Profile</Link>
            </div>
           <center> <button className="check" onClick={()=>check()}>Create Post</button></center>
            {a?<div className="post"><input placeholder="Post Name" type="text" value={postData.postName} onChange={(e) => setPostData({ ...postData, postName: e.target.value })} />
            <input  placeholder="Post Detail"type="text" value={postData.postDetail} onChange={(e) => setPostData({ ...postData, postDetail: e.target.value })} />
            <input type="text" value={postData.postImgUrl} placeholder="Post Image URL" onChange={(e) => setPostData({ ...postData, postImgUrl: e.target.value })} />
            <input type="text" value={postData.postPrice} placeholder="Post Price" onChange={(e) => setPostData({ ...postData, postPrice: e.target.value })} />
            <br/><button onClick={() => addPost()}>Add Post</button></div>:null}
            
            {!localStorage.getItem("postData") ? null :
                prop.postData.map((v, i) => {
                    return <div className="map" key={i}>
                        <img src={v.postImgUrl} />
                        <h4>{v.postName}</h4>
                        <h4>{v.postDetail}</h4>
                        <h4>{v.postPrice}</h4>
                        <h4>{v.postUserId}</h4>
                        {prop.id === v.postUserId ?<div className="btns"><button>Like</button> <button>Edit</button> <button onClick={() => del(i)}>Delete</button> </div>: null}
                    </div>

                })
            }


        </div>


    );

}


const mapReduxStateToProps = (state) => {
    console.log(state, "map");
    return {
        email: state.userData.email,
        id: state.userData.userId,
        photo: state.userData.photo,
        postData: state.postData
    }
};
export default connect(mapReduxStateToProps)(Home);
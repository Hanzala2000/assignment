import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import '../profile.css'
import { connect } from 'react-redux'
function UserProfile(prop) {
    const[a,seta] = useState(false)
    let [postData, setPostData] = useState({
        postName: "",
        postDetail: "",
        postImgUrl: "",
        postPrice: "",
    })
    
    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('LoginUser'));
        prop.dispatch({ type: "LOG_USER_DATA", payload: userData });

        let postData2 = JSON.parse(localStorage.getItem('postData'));
        prop.dispatch({ type: "POST_DATA_FROM_LS", payload: postData2 })
    }, [])
    let del = (i) => {
        let a = JSON.parse(localStorage.getItem("postData"))
        console.log(a);
        a.splice([i], 1)
        console.log(a);
        localStorage.setItem("postData", JSON.stringify(a))
        let postData2 = JSON.parse(localStorage.getItem('postData'));
        prop.dispatch({ type: "POST_DATA_FROM_LS", payload: postData2 })
    }
    let logOut = () => {
        localStorage.removeItem("LoginUser")
        window.location.reload()
    }
    let addPost = () => {
        console.log(postData);
        let post = { ...postData, postUserId: prop.id,edit:false }
        console.log(post);
        let arr = []

        let oldPostData = localStorage.getItem("postData");
        if (oldPostData == null) {
            arr.push(post);
            localStorage.setItem("postData", JSON.stringify(arr));
            prop.dispatch({ type: "ADD_POST", payload: arr })
        } else {
            let oldArr = JSON.parse(oldPostData);
            oldArr.push(post);
            localStorage.setItem("postData", JSON.stringify(oldArr));
            prop.dispatch({ type: "ADD_POST", payload: [post] })
        }

    }
    let edit = (i) => {
        
        // let a = [...prop.postData,prop.postData[i].edit=true]
        // window.location.reload()
        // localStorage.setItem("postData", JSON.stringify(a));
        // let b = JSON.parse(localStorage.getItem('postData'));
        // console.log(b);
        
        
    }
    let check =()=>{
        if(!a){

            seta(true)
        }else{
            seta(false)
        }
    }


    let set = () => {
        let post = { ...postData }
        let oldPostData = localStorage.getItem("postData");
        let oldArr = JSON.parse(oldPostData);
        oldArr.push(post);
        localStorage.setItem("postData", JSON.stringify(oldArr));
        prop.dispatch({ type: "ADD_POST", payload: [post] })

        
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
            <h4 className="prop">Email: {prop.email}</h4>
            <h4 className="prop">Id: {prop.id}</h4>
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
                    return <div  className="map" key={i}>{prop.id === v.postUserId ?
                        <div >
                            <h4>{prop.postData[i].edit ? <><h5>Set Image Url:  </h5><input defaultValue={v.postImgUrl} onChange={(e) => setPostData({ ...postData, postImgUrl: e.target.value })} /></> : <img src={v.postImgUrl} />}</h4>
                            <h4>{prop.postData[i].edit ? <><h5>Set Post Name:  </h5><input defaultValue={v.postName} onChange={(e) => setPostData({ ...postData, postName: e.target.value })} /></> : v.postName}</h4>
                            <h4>{prop.postData[i].edit ? <><h5>Set Post Detait:  </h5><input defaultValue={v.postDetail} onChange={(e) => setPostData({ ...postData, postDetail: e.target.value, })} /></> : v.postDetail}</h4>
                            <h4>{prop.postData[i].edit ? <><h5>Set Post Price:  </h5><input defaultValue={v.postPrice} onChange={(e) => setPostData({ ...postData, postPrice: e.target.value})} /><br /><button onClick={() => set()}>Set</button></> : v.postPrice}</h4>
                            {prop.id === v.postUserId ?<div className="btns"><button>Like</button> <button>Edit</button> <button onClick={() => del(i)}>Delete</button> </div>: null}
                        </div>
                        : null
                    }

                    </div>

                })
            }
        </div>
    )
}
const mapReduxStateToProps = (state) => {
    // console.log(state.postData, "map");
    return {
        email: state.userData.email,
        id: state.userData.userId,
        postData: state.postData,
        photo: state.userData.photo
    }
};
export default connect(mapReduxStateToProps)(UserProfile);
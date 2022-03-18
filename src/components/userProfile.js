import React,{useEffect,useState} from "react";
import {connect} from 'react-redux'
 function UserProfile(prop){
     let [postData, setPostData] = useState({
        postName: "",
        postDetail: "",
        postImgUrl: "",
        postPrice: ""
    })
    // let a =JSON.parse(localStorage.getItem("postData"))
    function getData() {
                let userData = JSON.parse(localStorage.getItem('LoginUser'));
                prop.dispatch({ type: "LOG_USER_DATA", payload: userData });
                
                let postData2 = JSON.parse(localStorage.getItem('postData'));
                prop.dispatch({ type: "POST_DATA_FROM_LS", payload: postData2 })
            }
    useEffect(() => {
        getData()
    }, [])
    let del = (i) => {
        let a = JSON.parse(localStorage.getItem("postData"))
        console.log(a);
        a.splice([i], 1)
        console.log(a);
        localStorage.setItem("postData", JSON.stringify(a))
        getData()
    }
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
        } else {
            let oldArr = JSON.parse(oldPostData);
            oldArr.push(post);
            localStorage.setItem("postData", JSON.stringify(oldArr));
            prop.dispatch({ type: "ADD_POST", payload: [post] })
        }


    }


    return(
        <div>
            <button onClick={() => logOut()}>Log Out</button>
            <h4>Email: {prop.email}</h4>
            <h4>Id: {prop.id}</h4>
            <input type="text" value={postData.postName} onChange={(e) => setPostData({ ...postData, postName: e.target.value })} />
            <input type="text" value={postData.postDetail} onChange={(e) => setPostData({ ...postData, postDetail: e.target.value })} />
            <input type="text" value={postData.postImgUrl} onChange={(e) => setPostData({ ...postData, postImgUrl: e.target.value })} />
            <input type="text" value={postData.postPrice} onChange={(e) => setPostData({ ...postData, postPrice: e.target.value })} />
            <button onClick={() => addPost()}>Add Post</button>
            { 
                prop.postData.map((v,i)=>{
                    return <div key={i}>{prop.id === v.postUserId ?
                    <div> <img src={v.postImgUrl}/>
                     <h4>{v.postName}</h4>
                        <h4>{v.postDetail}</h4>
                        <h4>{v.postPrice}</h4>
                        <h4>{v.postUserId}</h4>
                        {prop.id === v.postUserId ? <button onClick={() => del(i)}>Delete</button> : null}
                    </div>
                    :null
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
        postData: state.postData
    }
};
export default connect(mapReduxStateToProps)(UserProfile);
import React from "react";
import { useHistory } from 'react-router-dom'
export default function Start(){
    const history  = useHistory()
    return(
        <div>
            <button onClick={()=>history.push('/sign')}>Sign In</button>
            <button onClick={()=>history.push('/log')}>Login In</button>
        </div>
    )
}
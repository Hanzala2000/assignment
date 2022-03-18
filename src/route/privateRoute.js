
import { Route,Redirect } from "react-router-dom";


const PrivateRoute=({ children, ...rest }) => {
    const data = localStorage.getItem("LoginUser");
    return(
        <Route 
        {...rest}
        render={()=>data ?(children) :(<Redirect to="/"/>)
        }
        />
    ) 
}






const PublicRoute=({ children, ...rest }) => {
    const data = localStorage.getItem("LoginUser");
    return(
        <Route 
        {...rest}
        render={()=>
            !data ?(children) 
            :
            (
                <Redirect to="/userProfile" />
                )
        }
        />
    ) 
}
export  {PrivateRoute,PublicRoute};

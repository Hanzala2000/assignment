import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ childern, ...rest }) {
  let data = localStorage.getItem("User_Data");
  return (
    <Route
      {...rest}
      render={() => data ? (childern) : (<Redirect to="/start" />)}
    />
  );
}
function PublicRoute({ childern, ...rest }) {
  let data = localStorage.getItem("User_Data");
  return (
    <Route
      {...rest}
      render={() => !data ? (childern) : (<Redirect to="/userProfile" />)}
    />
  );
}
export{
  PrivateRoute,
  PublicRoute,
}
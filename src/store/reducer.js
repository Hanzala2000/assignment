// const INITIAL_STATE = {
//     email:"",
//     password:"",
// }
// export default function reducer(state = INITIAL_STATE, action) {
//     switch (action.type) {
//         case "SET_USER_DATA":
//             console.log(action);
//             console.log(state);
//             return {...state,email:action.email,password:action.password}
//         }
//         return state
//     }
const INITIAL_STATE = {
    users:[]
  };
  
  function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
  
        case "SET_USER_DATA":
            console.log(action.email,'action')
            // return {...state,email:action.email,password:action.password}
            return {...state,
            users:{...state.users,email:action.email,password:action.password}
        }
    }
    return state;
  }
  
  export default reducer;
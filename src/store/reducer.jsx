// const INITIAL_STATE = {
//   email:"",
//   password:""
// }
const INITIAL_STATE = []
export default function reducer(state = INITIAL_STATE, action) {
    console.log(action);
    console.log(INITIAL_STATE);
    // console.log(arr);
    switch (action.type) {
        case "SET_USER_DATA":
            return INITIAL_STATE.push({email:action.email,password:action.password})
            // return { ...state, email:action.email,  password:action.password }
    }
    return state
}

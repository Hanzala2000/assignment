
const INITIAL_STATE = {
  userData: {
    email: "",
    userId: "",
  },
  postData:[]
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_USER_DATA":
      // console.log(action, 'action')
      return { ...state, userData: { ...state.userData, email: action.payload.email,userId:action.payload.id } }
      case "ADD_POST":
        return{...state,postData:[...state.postData,...action.payload]}
        case "POST_DATA_FROM_LS":
          return {...state,postData:action.payload}
          default:
      }
  return state;
}

export default reducer;
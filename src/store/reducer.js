
const INITIAL_STATE = {
  userData: {
    email: "",
    userId: "",
    photo:null
  },
  postData:[]
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_USER_DATA":
      // console.log(action, 'action')
      console.log(state, 'state')
      return { ...state, userData: { ...state.userData, email: action.payload.email,userId:action.payload.id,photo:action.payload.signPhoto } }
      case "ADD_POST":
        return{...state,postData:[...state.postData,...action.payload]}
        case "POST_DATA_FROM_LS":
          return {...state,postData:action.payload}
      }
  return state;
}

export default reducer;
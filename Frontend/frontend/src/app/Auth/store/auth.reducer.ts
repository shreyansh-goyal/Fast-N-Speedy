import * as AuthAction from "./auth.actions";

const initialState={
    user:{
        "name": null,
        "emailId": null,
        "phoneNo": null,
        "address": null,
        "landmark": null,
        "latitude": null,
        "longitude": null,
        "password": null,
        "token": null,
        "userId": null,
        "confirm": null,
        "jwtToken":null
    }
}
export function AuthReducer(state=initialState,action:AuthAction.AuthUserActions){
    console.log(action);
    switch(action.type)
    {
        case AuthAction.ADD_USER:return{
            ...state,
            user:{
                ...state.user,
                ...action.payload.user
            }
        }
        case AuthAction.REMOVE_USER:return{
         initialState   
        }
        default:return{
            ...state
        }
    }
}
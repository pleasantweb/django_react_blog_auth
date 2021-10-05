import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILED,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    USER_LOGOUT
} from './types'

const initial_state = {
   signup_success:null,
   is_authenticated:null,
   login_success:null,
   access:localStorage.getItem('access'),
   refresh:localStorage.getItem('refresh'),
   reset_password_mail_sent:null,
   password_changed:null,
   user:null
}


export default function authReducer(state=initial_state,action){
    const {type,payload} = action
    switch(type){
        case SIGNUP_SUCCESS:
            return{
                ...state,
                signup_success:true
            }
        case SIGNUP_FAILED:
            return{
                ...state,
                signup_success:false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access',payload.access)
            return{
                ...state,
                login_success:true,
                access:payload.access,
                refresh:payload.refresh
            }
        case LOGIN_FAILED:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access:null,
                refresh:null,
                login_success:false
            }
        case AUTHENTICATED_SUCCESS:
        case USER_LOADED_SUCCESS:
            return{
                ...state,
                is_authenticated:true,
                user:payload
            }
        case AUTHENTICATED_FAILED:
        case USER_LOADED_FAILED:
            return{
                ...state,
                is_authenticated:false
            }
        
        case USER_LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                is_authenticated:null,
                login_success:null,
                signup_success:null,
                access:null,
                refresh:null

            }
        case RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                reset_password_mail_sent:true
            }
        case RESET_PASSWORD_FAILED:
            return{
                ...state,
                reset_password_mail_sent:false
            }
        case RESET_PASSWORD_CONFIRM_SUCCESS:
            return{
                ...state,
                password_changed:true
            }
        case RESET_PASSWORD_CONFIRM_FAILED:
            return{
                ...state,
                password_changed:false
            }
        
        default:
            return{
            ...state
        }
    }
}
const initState= {
    authError: null
}

const authReducer =(state=initState, action)=>{
switch (action.type) {
    case 'LOGIN_ERROR':
        // console.log('Login error');
        return{
            ...state,
            authError: 'Login Failed'
        }
    case 'LOGIN_SUCCESS':
        // console.log('Login successfull');
        return{
            ...state,
            authError: null
        }
    case 'SIGNOUT_SUCCESS':
        // console.log('Signout successfull');
        return {
            state}
    case 'SIGNUP_SUCCESS':
        // console.log('signUp successfull');
        return{
            ...state,
            authError: null
        }
    case 'SIGNUP_ERROR':
        // console.log('signUp error');
        return{
            ...state,
            authError: action.err.message
        }
        case 'RESET_PASSWORD_SUCCESS':
        // console.log('email sent successfull');
        return{
            ...state,
            authError: 'check your mail for a link to reset your password'
        }
    case 'RESET_PASSWORD_ERROR':
        // console.log('Reset Password error');
        return{
            ...state,
            authError: action.err.message
        }
    default:
        return state;
}
}

export default authReducer;
const initState= {
    token: [],
    error: null
}

const pushNotificationReducer =(state=initState, action)=>{
    switch (action.type) {
        case 'ADD_TOKEN':
            // console.log('created token', action.token);
            return{
                ...state,
                error: null
            }
        case 'ADD_TOKEN_ERROR':
        // console.log('token error', action.err);
        return{
            ...state,
            error: 'creating token failed'
        }
        default:
            return state;
    }
}

export default pushNotificationReducer;
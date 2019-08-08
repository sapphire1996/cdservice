const initState= {
    adverts: [],
    error: null
}

const advertReducer =(state=initState, action)=>{
    switch (action.type) {
        case 'CREATE_ADVERT':
            console.log('created advert', action.data);
            return{
                ...state,
                error: null
            }
        case 'CREATE_ADVERT_ERROR':
        console.log('created advert error', action.err);
        return{
            ...state,
            error: 'creating advert failed'
        }
        case 'DELETE_ADVERT':
        console.log('Deleted advert', action.id);
        return{
            ...state,
            error: null
        }
        case 'DELETE_ADVERT_ERROR':
        console.log('error deleting advert', action.err);
        return{
            ...state,
            error: 'deleting advert Failed'
        }
        default:
            return state;
    }
}

export default advertReducer;
const initState= {
    adverts: []
}

const advertReducer =(state=initState, action)=>{
    switch (action.type) {
        case 'CREATE_ADVERT':
        console.log(this.state.adverts);
            console.log('created advert', action.data);
            return state;
        case 'CREATE_ADVERT_ERROR':
        console.log('created advert error', action.err);
        return state;
        default:
            return state;
    }
}

export default advertReducer;
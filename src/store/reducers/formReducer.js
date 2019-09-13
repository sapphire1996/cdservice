const initState= {
    form: [
       
    ]
}

const formReducer =(state=initState, action)=>{
    switch (action.type) {
        case 'REGISTER_CDS':
            // console.log('created project', action.form);
            return state;
        case 'REGISTER_CDS_ERROR':
        // console.log('created project error', action.err);
            return state;
        default:
            return state;
    }
}

export default formReducer;
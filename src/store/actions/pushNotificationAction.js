export const addToken= (token)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const authorId= getState().firebase.auth.uid;
        firestore.collection('tokens').add({
            token: token, 
            userId: authorId
        }).then(()=>{
            dispatch({type: 'ADD_TOKEN', token})

        }).catch((err)=>{
            dispatch({type: 'ADD_TOKEN_ERROR', err})

        })
        
    }
};
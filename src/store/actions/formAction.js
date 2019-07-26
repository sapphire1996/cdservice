export const submitForm= (form)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const stateCombo = getState().firestore.data.editables.edited;
        const authorId= getState().firebase.auth.uid;
        firestore.collection('cdsRegLists').doc(authorId).set({
            ...form, 
            authorName: profile.firstName +" "+ profile.lastName,
            stateCode: stateCombo.scode + '/'+ stateCombo.bcode + '/',
            identity: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: 'REGISTER_CDS', form})
        }).catch((err)=>{
            dispatch({type: 'REGISTER_CDS_ERROR', err})
        })
        
    }
};

export const signIn = (credentials)=>{
    return(dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=>{
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((err)=>{
            dispatch({type: 'LOGIN_ERROR', err});
        })
    }
}
export const resetPassword=(credential)=>{
    return(dispatch, getState, {getFirebase})=>{
    const firebase = getFirebase();
    firebase.auth().sendPasswordResetEmail(credential.email).then(()=> {
        dispatch({type: 'RESET_PASSWORD_SUCCESS'});
    }).catch((err)=> {
        dispatch({type: 'RESET_PASSWORD_ERROR', err});
    });
    }
}

export const signOut =()=>{
    return(dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase();
        firebase.auth().signOut().then(()=>{
            firebase.logout()
            dispatch({type: 'SIGNOUT_SUCCESS'})
        })
    }
}

export const signUp=(newUser)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp)=>{
        //   console.log(resp);
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] +newUser.lastName[0],
                stateCode: newUser.stateCode,
                isAdmin: false
            })
        }).then(()=>{
            dispatch({type: 'SIGNUP_SUCCESS'});
        }).catch((err)=>{
            dispatch({type: 'SIGNUP_ERROR', err});
        })
    }
}

export const adminSignUp=(newUser)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp)=>{          
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: "NYSC",
                lastName: "Admin",
                initials: "Admin",
                isAdmin: true
            })
        }).then(()=>{
            dispatch({type: 'SIGNUP_SUCCESS'});
        }).catch((err)=>{
            dispatch({type: 'SIGNUP_ERROR', err});
        })
    }
}
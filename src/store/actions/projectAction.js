import { storage } from '../../config/fbConfig';

export const createProject= (data)=>{
    const {title, content,stateCode, picture} = data;
    return(dispatch, getState, {getFirebase, getFirestore})=>{        
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId= getState().firebase.auth.uid;
        console.log(getState.firebase);
        
        if(authorId != null) {
            var store = storage.ref(`profile/${picture.name}`).put(picture);
            store.on('state_changed',
            //progress function
             (snapshot)=>{
                 console.log('loading...');
            }, 
            // error function
            (error)=>{
                console.log(error);
            },
            //complete function
             ()=>{
                storage.ref('profile').child(picture.name).getDownloadURL().then(url=>{
                    firestore.collection('projects').add({
                        title,
                        content, 
                        authorFullName: profile.firstName + ' ' + profile.lastName,
                        authorId: authorId,
                        picture: url,
                        createdAt: new Date(),
                        likeCount: 0,
                        stateCode
                    }).then(()=>{
                        dispatch({type: 'CREATE_PROJECT', data})
            
                    }).catch((err)=>{
                        dispatch({type: 'CREATE_PROJECT_ERROR', err})
            
                    })
                })
            })     
        } 
    }
};
export const addLike=(id)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('projects').doc(id).update({
            likeCount: firestore.FieldValue.increment(1) 
        }).then(()=>{
                dispatch({type: 'LIKED'});
            }).catch((err)=>{
                dispatch({type: 'LIKED_ERROR', err})
            })
        }
}
export const removeLike=(id)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('projects').doc(id).update({
            likeCount: firestore.FieldValue.increment(-1)
        }).then(()=>{
                dispatch({type: 'DISLIKED'});
            }).catch((err)=>{
                dispatch({type: 'DISLIKED_ERROR', err})
            })
        }
    
}
import { storage } from '../../config/fbConfig';
const uuidv4 = require('uuid/v4');

export const createProject= (data)=>{
    const {title, content,stateCode, picture} = data;
    return(dispatch, getState, {getFirebase, getFirestore})=>{        
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId= getState().firebase.auth.uid;
        let uuid = uuidv4(picture.name)
        if(authorId != null) {
            var store = storage.ref(`profile/${uuid}/${picture.name}`).put(picture);
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
                storage.ref(`profile/${uuid}/`).child(picture.name).getDownloadURL().then(url=>{
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

export const deleteProject=(id)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const file =firestore.collection('projects').doc(id)
        file.get().then(doc=>{            
            // //remove picture from storage
            const url =storage.refFromURL(doc.data().picture)                    
            storage.ref().child(url.location.path).delete();
        }).then(()=>file.delete()).then(()=>{
                dispatch({type: 'DELETE_PROJECT', id});
            }).catch((err)=>{
                dispatch({type: 'DELETE_PROJECT_ERROR', err})
            })
        }
}
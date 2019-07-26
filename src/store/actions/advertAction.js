import { storage } from '../../config/fbConfig';

export const createAdvert= (data)=>{
    const {product, action, picture, duration} = data;
    return(dispatch, getState, {getFirebase, getFirestore})=>{   
        const firestore = getFirestore();     
        const profile = getState().firebase.profile;
        const authorId= getState().firebase.auth.uid;
        if(authorId != null) {
            var store = storage.ref(`advertisements/${picture.name}`).put(picture);
            store.on('state_changed',
            //progress function
             (snapshot)=>{
                 console.log('creating advert...');
            }, 
            // error function
            (error)=>{
                console.log(error);
            },
            //complete function
             ()=>{
                storage.ref('advertisements').child(picture.name).getDownloadURL().then(url=>{
                    firestore.collection('adverts').add({
                        action,
                        advertizerName: profile.firstName+' '+profile.lastName,
                        approved: false,
                        authorId: authorId,
                        createdAt: new Date(),
                        duration,
                        picture: url,
                        product
                     }).then(()=>{
                        dispatch({type: 'CREATE_ADVERT', data})
                        }).catch((err)=>{
                        dispatch({type: 'CREATE_ADVERT_ERROR', err})
                    })
                 });
            })     
        } 
    }
};

export const approveAdvert=(id)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('adverts').doc(id).update({
            approved: true
        }).then(()=>{
                dispatch({type: 'APPROVED'});
            }).catch((err)=>{
                dispatch({type: 'APPROVED_ERROR', err})
            })
        }
}

export const deleteAdvert=(id)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('adverts').doc(id).delete().then(()=>{
                dispatch({type: 'DELECTED'});
            }).catch((err)=>{
                dispatch({type: 'DELECTED_ERROR', err})
            })
        }
}
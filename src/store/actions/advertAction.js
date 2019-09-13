import { storage } from '../../config/fbConfig';
// import {showProgress} from '../../components/dashboard/AdvertForm';
const uuidv4 = require('uuid/v4');

export let progress =0;

export const createAdvert= (data)=>{
    const {product, action, picture, duration, amount, displayName, token } = data;
    return(dispatch, getState, {getFirebase, getFirestore})=>{   
        const firestore = getFirestore();     
        const profile = getState().firebase.profile;
        const authorId= getState().firebase.auth.uid;
        let uuid = uuidv4(picture.name)
        if(authorId != null) {
            var store = storage.ref(`advertisements/${uuid}/${picture.name}`).put(picture);
            store.on('state_changed',
            //progress function
             (snapshot)=>{
                 const uploadprogress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                         progress=uploadprogress ;     
            }, 
            // error function
            (error)=>{
                console.log(error);
            },
            //complete function
             ()=>{
                storage.ref(`advertisements/${uuid}/`).child(picture.name).getDownloadURL().then(url=>{
                    firestore.collection('adverts').add({
                        action,
                        advertizerName: profile.firstName+' '+profile.lastName,
                        displayName,
                        approved: false,
                        authorId: authorId,
                        createdAt: new Date(),
                        duration,
                        picture: url,
                        amountPaid: amount,
                        product,
                        disapproval: 'Has used up it life span',
                        userToken: token
                     }).then(()=>{
                        dispatch({type: 'CREATE_ADVERT',data })
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
            approved: true,
            approvalDate: new Date()
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

        var update = new Promise(function(resolve, reject) {
            setTimeout(()=>{ firestore.collection('adverts').doc(id).update({
                disapproval: "Has just been disapproved by the admin"
            }); resolve();}, 3000);
        })
        //.delete().then
        var remove = new Promise(function(resolve, reject) {
            setTimeout(()=>{ 
                const file =firestore.collection('adverts').doc(id)
                file.get().then(doc=>{
                    //remove picture from storage
                    const url =storage.refFromURL(doc.data().picture)                    
                    storage.ref().child(url.location.path).delete();
                }).then(()=>{
                    file.delete()
                }).then(()=>{
                dispatch({type: 'DELETE_ADVERT', id});
            }); resolve();}, 3000);
        })
        
        Promise.all([update, remove]).then(() =>{
             console.log('done') 
        });
    }
}


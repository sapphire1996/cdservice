export const editForm= (editable)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('editables').doc('edited').set({
            ...editable
        }).then(()=>{
            dispatch({type: 'EDIT_FORM', editable})

        }).catch((err)=>{
            dispatch({type: 'EDIT_FORM_ERROR', err})

        })
        
    }
};
export const addCourse= (course)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('courses').add({
            ...course, 
        }).then(()=>{
            dispatch({type: 'COURSE_LIST', course})

        }).catch((err)=>{
            dispatch({type: 'COURSE_LIST_ERROR', err})
        })
        
    }
};

export const deleteCourse=(id)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('courses').doc(id).delete().then(()=>{
                dispatch({type: 'DELETE_COURSE', id});
            }).catch((err)=>{
                dispatch({type: 'DELETE_COURSE_ERROR', err})
            })
        }
}

export const addCdsGroup= (cds)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('cdsGroups').add({
            ...cds, 
        }).then(()=>{
            dispatch({type: 'CDS_LIST', cds})

        }).catch((err)=>{
            dispatch({type: 'CDS_LIST_ERROR', err})

        })
        
    }
};

export const deleteCdsGroup=(id)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('cdsGroups').doc(id).delete().then(()=>{
                dispatch({type: 'DELETE_CDS', id});
            }).catch((err)=>{
                dispatch({type: 'DELETE_CDS_ERROR', err})
            })
        }
}

export const addLocalGovt= (localgovt)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('localGovtList').add({
            ...localgovt, 
        }).then(()=>{
            dispatch({type: 'LOCAL_GOVT_LIST', localgovt})

        }).catch((err)=>{
            dispatch({type: 'LOCAL_GOVT_LIST_ERROR', err})

        })
        
    }
};

export const deleteLocalGovt=(id)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('localGovtList').doc(id).delete().then(()=>{
                dispatch({type: 'DELETE_LG', id});
            }).catch((err)=>{
                dispatch({type: 'DELETE_LG_ERROR', err})
            })
        }
}

export const addLocalGovtCds= (localgovtId, localgovtcds)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
            firestore.collection('localGovtList').doc(localgovtId).update({
                cdsGroup:  firestore.FieldValue.arrayUnion(localgovtcds),
        }).then(()=>{
            dispatch({type: 'LOCAL_GOVT_CDS', localgovtcds})

        }).catch((err)=>{
            dispatch({type: 'LOCAL_GOVT_CDS_ERROR', err})

        })
        
    }
};

export const asignCds= (authorId, asignedCds)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('cdsRegLists').doc(authorId).update({
            cds: asignedCds,
        }).then(()=>{
            dispatch({type: 'ASIGN_CDS', asignedCds})

        }).catch((err)=>{
            dispatch({type: 'ASIGN_CDS_ERROR', err})

        })
        
    }
};
export const updateGuidline= (guidline)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('projectGuidline').doc('guidline').set({
            ...guidline, 
        }).then(()=>{
            dispatch({type: 'PROJECTGUIDLINE', guidline})

        }).catch((err)=>{
            dispatch({type: 'PROJECTGUIDLINE_ERROR', err})

        })
        
    }
};

export const sendNotification= (content)=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        
        firestore.collection('notifications').add({
            ...content, 
            user: profile.firstName+' '+ profile.lastName+':',
            title: 'To whom it may concern!',
            time: new Date()
        }).then(()=>{
            dispatch({type: 'SEND_NOTIFICATION', content})

        }).catch((err)=>{
            dispatch({type: 'SEND_NOTIFICATION_ERROR', err})

        })
        
    }
};

export const deleteRegister=()=>{
    return(dispatch, getState, {getFirebase, getFirestore})=>{
    const firestore = getFirestore();
    firestore.collection('cdsRegLists').where('codeNumber','>','0000').get()
        .then(snapshot => {
            let batch = firestore.batch();
            snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
            });
            return batch.commit();
        }).then(()=>{
            dispatch({type: 'DELETED'});
            window.location.reload();
        }).catch((err)=>{
            dispatch({type: 'DELETED_ERROR', err})
        })
    }
}


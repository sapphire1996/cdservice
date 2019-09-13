import authReducer from './authReducer';
import projectReducer from './projectReducer';
import adminReducer from './adminReducer';
import formReducer from './formReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase";
import advertReducer from './advertReducer';
import pushNotificationReducer from './pushNotificationReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    admin: adminReducer,
    advert: advertReducer,
    pushNotification: pushNotificationReducer,
    form: formReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer;
import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import config from './config/fbConfig';

const store = createStore(rootReducer,
    compose( applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(config),
    reactReduxFirebase(config, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
    )
);
store.firebaseAuthIsReady.then(()=>{
    ReactDOM.render(<Provider store={store}><App /></Provider>,
         document.getElementById('root'));
})

// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

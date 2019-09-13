const initState= {
    projects: [
        // {id: '1', title: 'help me', content: 'baby cries'},
        // {id: '2', title: 'help me out', content: 'baby cries out'},
        // {id: '3', title: 'help me out here', content: 'baby cries out loud'}

    ]
}

const projectReducer =(state=initState, action)=>{
    switch (action.type) {
        case 'CREATE_PROJECT':
            // console.log('created project', action.data);
            return state;
        case 'CREATE_PROJECT_ERROR':
        // console.log('created project error', action.err);
            return state;
        case 'LIKED':
            // console.log('incresing like by one');
            return state;
        case 'LIKED_ERROR':
        // console.log('created project error', action.err);
            return state;
        case 'DISLIKED':
            // console.log('decresing like by one');
            return state;
        case 'DISLIKED_ERROR':
        // console.log('disliking error', action.err);
            return state;  
        case 'DELETE_PROJECT':
        // console.log('Deleted project', action.id);
            return state;  
        case 'DELETE_PROJECT_ERROR':
        // console.log('error deleting project', action.err);
            return state;  
        default:
            return state;
    }
}

export default projectReducer;
const initState= {
    error: null
}

const adminReducer =(state=initState, action)=>{
    switch (action.type) {
        case 'COURSE_LIST':
        // console.log('course list', action.course);
        return{
            ...state,
            error: null
        }
        case 'COURSE_LIST_ERROR':
        // console.log('course list error', action.err);
        return{
            ...state,
            error: 'adding failed'
        } 
        case 'CDS_LIST':
        // console.log('CDS list', action.cds);
        return{
            ...state,
            error: null
        }
        case 'CDS_LIST_ERROR':
        // console.log('CDS list error', action.err);
        return{
            ...state,
            error: 'adding CDS failed'
        }
        case 'LOCAL_GOVT_LIST':
        // console.log('local govt list', action.localgovt);
        return{
            ...state,
            error: null
        }
        case 'LOCAL_GOVT_LIST_ERROR':
        // console.log('localgovt list error', action.err);
        return{
            ...state,
            error: 'adding local govt failed'
        }
        case 'LOCAL_GOVT_CDS':
        // console.log('local govt cds list', action.localgovtcds);
        return{
            ...state,
            error: null
        }
        case 'LOCAL_GOVT_CDS_ERROR':
        // console.log('localgovt cds list error', action.err);
        return{
            ...state,
            error: 'adding local cds govt failed'
        }
        case 'EDIT_FORM':
            // console.log('edited form', action.editable);
            return{
                ...state,
                error: null
            }
        case 'EDIT_FORM_ERROR':
        // console.log('edited form error', action.err);
        return{
            ...state,
            error: 'Editing Failed'
        }
        case 'PROJECTGUIDLINE':
        // console.log('edited guidline', action.guidline);
        return{
            ...state,
            error: null
        }
        case 'PROJECTGUIDLINE_ERROR':
        // console.log('edited guidline error');
        return{
            ...state,
            error: 'Editing Failed'
        }
        case 'SEND_NOTIFICATION':
        // console.log('sent notification', action.content);
        return{
            ...state,
            error: null
        }
        case 'SEND_NOTIFICATION_ERROR':
        // console.log('sent notification error', action.err);
        return{
            ...state,
            error: 'Sending Failed'
        }
        case 'ASIGN_CDS':
        // console.log('asigned cds', action.asignedCds);
        return{
            ...state,
            error: null
        }
        case 'ASIGN_CDS_ERROR':
        // console.log('asigned cds error', action.err);
        return{
            ...state,
            error: 'asigning Failed'
        }
        case 'DELETE_COURSE':
        // console.log('Deleted course', action.id);
        return{
            ...state,
            error: null
        }
        case 'DELETE_COURSE_ERROR':
        // console.log('error deleting course', action.err);
        return{
            ...state,
            error: 'deleting course Failed'
        }
        case 'DELETE_LG':
        // console.log('Deleted local Govt', action.id);
        return{
            ...state,
            error: null
        }
        case 'DELETE_LG_ERROR':
        // console.log('error deleting local govt', action.err);
        return{
            ...state,
            error: 'deleting local govt Failed'
        }
        case 'DELETE_CDS':
        // console.log('Deleted CDS', action.id);
        return{
            ...state,
            error: null
        }
        case 'DELETE_CDS_ERROR':
        // console.log('error deleting CDS', action.err);
        return{
            ...state,
            error: 'deleting CDS Failed'
        }
        default:
            return state;
    }
}

export default adminReducer;
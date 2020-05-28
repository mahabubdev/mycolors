import {
    TOG_SIDENAV
} from '../actions/types';


// initState
const initState = {
    sideExpanded: true,
    sidenav: {
        expanded: {
            width: {
                minWidth: '260px'
            },
            logo : {
                fontSize: '32px'
            },
            dashHeader: {
                width: 'calc(100% - 260px)'
            },
            mrDash: {
                marginLeft: '260px',
                width: 'calc(100% - 260px)'
            }
        },
        collapsed: {
            width: {
                minWidth: '60px',
            },
            logo : {
                fontSize: '14px',
                padding: '5px'
            },
            dashHeader: {
                width: 'calc(100% - 80px)'
            },
            mrDash: {
                marginLeft: '80px',
                width: 'calc(100% - 80px)'
            }
        }
    },
}

export default function (state = initState, action) {
    //switch action types
    switch(action.type) {
        // LOGIN SUCCESS
        case TOG_SIDENAV: 
            return {
                ...state,
                sideExpanded: ! state.sideExpanded
            }
        

        default : return state
    }
}
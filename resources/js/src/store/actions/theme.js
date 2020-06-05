import {
    TOG_SIDENAV
} from "./types";



// load user data
export const toogleNavSide = () => {
    return function (dispatch) {
        dispatch({
            type: TOG_SIDENAV
        })
    }
}




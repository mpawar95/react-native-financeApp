
import {
    ADD_CATEGORY_FETCH_SUCCESS,
    ADD_CATEGORY_FETCH_FAIL,
    CATEGORY_UPDATE_PROPS,
    CATEGORY_RECEIVE_PROPS
} from '../CategoryActions/types'
import { db } from '../../utils/firebaseConfig'


export const updateCategoryProps=(dispatch,payload)=>{
    dispatch({
        type:CATEGORY_UPDATE_PROPS,
        payload:payload
    })
}
export const receivePropsCategoryLoad=()=>{
    return { 
        type: CATEGORY_RECEIVE_PROPS
    }
}

export const getCategories = (cat_type) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            var items = [];
            db.ref('/Category/').orderByChild("category_type").equalTo(cat_type).once('value', async function (snapshot) {
                snapshot.forEach(child => {
                    items.push({
                        id: child.key,
                        category_name: child.val().category_name,
                        category_type: child.val().category_type,
                        selected_Icon: child.val().selected_Icon
                    })
                    return items
                });
                if (items != null) {
                    resolve(dispatch({ type: ADD_CATEGORY_FETCH_SUCCESS, payload: items }))
                } else {
                    reject(dispatch({ type: ADD_CATEGORY_FETCH_FAIL, payload: "Something Wrong" }))
                }
            })
        })
    }
}
import {Actions} from 'react-native-router-flux';
import {createAction, handleActions} from 'redux-actions'
import  Immutable,{List,Record} from 'immutable'

const initialState = 0

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'


export const increment = createAction(COUNTER_INCREMENT, (value = 1)=>value)

export const doubleAsync = () => {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(increment(getState().counter))
        }, 100)
    }
}


export const actions = {
    increment,
    doubleAsync
}


export  default handleActions({
    [COUNTER_INCREMENT]: (state, {payload})=>state + payload
}, initialState)

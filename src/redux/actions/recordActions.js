import {
   IS_RECORDING,
   SET_RECORDING,
   SET_ALL_RECORDINGS
} from '../constants'


export const setIsRecordingAction = (boolean, dispatch) => {
    dispatch({
        type: IS_RECORDING,
        payload: boolean
    })
}

export const setAllRecordingsAction = (array, dispatch) => {
    dispatch({
        type: SET_ALL_RECORDINGS,
        payload: array
    })
}

export const setRecordingAction = (obj, dispatch) => {
    console.log("000 recording action"+ obj)
    dispatch({
        type: SET_RECORDING,
        payload: obj
    })
}

import {
    IS_PLAYING,
    SET_ALL_AUDIO,
    SET_AUDIO
} from '../constants'


export const setIsPlayingAction = (boolean, dispatch) => {
    dispatch({
        type: IS_PLAYING,
        payload: boolean
    })
}

export const setAllAudioAction = (obj, dispatch) => {
    dispatch({
        type: SET_ALL_AUDIO,
        payload: obj
    })
}

export const setAudioAction = (obj, dispatch) => {
    dispatch({
        type: SET_AUDIO,
        payload: obj
    })
}
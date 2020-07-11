import {
    IS_PLAYING,
    SET_ALL_AUDIO,
    SET_AUDIO
} from '../constants'

const initialState = {
    isPlaying: false,
    allAudios: [],
    audio: {}
}

export const AudioReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case IS_PLAYING:
            return { ...state, isPlaying: action.payload }

        case SET_ALL_AUDIO:
            return { ...state, allAudios: action.payload }

        case SET_AUDIO:
            return { ...state, audio: action.payload }

        default:
            return state
    }
}
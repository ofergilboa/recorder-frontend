import {
    SET_ALL_RECORDINGS,
    SET_RECORDING,
    IS_RECORDING
} from '../constants'

const initialState = {
    isRecording: false,
    recording: {},
}

export const RecordReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case IS_RECORDING:
            return { ...state, isRecording: action.payload }

        case SET_RECORDING:
            return { ...state, recording: action.payload }

        default:
            return state
    }
} 
import { useSelector } from 'react-redux'

const getAudioSelectors = (value) => {


    switch (value) {
        case 'isPlaying':
            return (useSelector(state => (
                state.RecordReducer.isPlaying)))

        case 'allAudios':
            return (useSelector(state => (
                state.RecordReducer.allAudios)))

        case 'audio':
            return (useSelector(state => (
                state.RecordReducer.audio)))

        default:
            return value
    }
}


export default getAudioSelectors
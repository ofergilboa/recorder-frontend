import { useSelector } from 'react-redux'

const getAudioSelectors = (value) => {

    switch (value) {
        case 'isPlaying':
            return (useSelector(state => (
                state.AudioReducer.isPlaying)))

        case 'allAudios':
            return (useSelector(state => (
                state.AudioReducer.allAudios)))

        case 'audio':
            return (useSelector(state => (
                state.AudioReducer.audio)))

        default:
            return value
    }
}

export default getAudioSelectors
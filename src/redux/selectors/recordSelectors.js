import { useSelector } from 'react-redux'

const getRecordSelectors = (value) => {

    switch (value) {
        case 'isRecording':
            return (useSelector(state => (
                state.RecordReducer.isRecording)))

        case 'recording':
            return (useSelector(state => (
                state.RecordReducer.recording)))


        default:
            return value
    }
}


export default getRecordSelectors
import { useSelector } from 'react-redux'

const getRecordSelectors = (value) => {

    switch (value) {
        case 'isRecording':
            return (useSelector(state => (
                state.RecordReducer.isRecording)))

        case 'allRecordings':
            return (useSelector(state => (
                state.RecordReducer.allRecordings)))

        case 'recording':
            return (useSelector(state => (
                state.RecordReducer.recording)))


        default:
            return value
    }
}


export default getRecordSelectors
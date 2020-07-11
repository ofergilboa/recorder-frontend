import React from 'react'
import { Audio } from 'expo-av'
import { Text, View } from 'react-native';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import getRecordSelectors from '../redux/selectors/recordSelectors';
import { setRecordingAction, setAllRecordingsAction, setIsRecordingAction } from '../redux/actions/recordActions'
import { setRecordSettings } from '../services/audioSettings'


// export const route = 'http://10.0.2.2:8181/'

const Recorded = () => {

    const dispatch = useDispatch()
    let recording = getRecordSelectors('recording')

    const setRecord = (obj) => {
        setRecordingAction(obj, dispatch)
    }

    // let recording = {}
    let audio = {}

    const record = async () => {

        let { status, granted } = await Audio.requestPermissionsAsync()
        console.log('1 status: ' + status + ', granted: ' + granted)
        console.log('recording: ' + recording)

        let recordingT = new Audio.Recording()
        setRecordSettings()

        console.log('1: ' + recordingT.prepareToRecordAsync)
        await setRecord(recordingT)
        console.log('2: ' + recording.prepareToRecordAsync)

        try {
            await recording.prepareToRecordAsync();
            await recording.startAsync();
            console.log('recording')
        } catch (error) {
            console.log('4 not recording: ' + error)
        }
    }

    const stopRecording = async () => {
        console.log('5 stopped recording: ' + recording.durationMillis)
        // await recording.stopAndUnloadAsync()
        await setRecord(recording.stopAndUnloadAsync())

        console.log('5 stopped recording: ' + recording._finalDurationMillis)

        // const saveRecording = {
        //     "type": "recording",
        //     "duration": recording._finalDurationMillis,
        //     "sound": recording.sound
        // }
        // await axios.post(`${route}recording`, saveRecording)

        audio = await recording.createNewLoadedSoundAsync()
        audio = audio.sound

        // const saveAudio = {
        //     "type": "audio",
        //     "duration": audio._finalDurationMillis,
        //     "sound": audio.sound
        // }
        // await axios.post(`${route}recording`, saveAudio)
    }

    const getAudio = async () => {
        let source = require('../assets/SoundHelix-Song-2.mp3')
        // let source = { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
        // let source = require(uri)
        audio = new Audio.Sound()
        try {
            await audio.loadAsync(source)
            console.log('loaded: ' + uri)
        } catch (error) {
            console.log('error: ' + error)
        }
    }

    const playAudio = async () => {
        await audio.playAsync()
        console.log('8 play')
        console.log('audio: ' + audio._finalDurationMillis)
        // setTimeout(async () => {
        //     await audio.setVolumeAsync(1)
        //     console.log('9 set volume')
        // }, 3000)
    }

    const stopAudio = async () => {
        audio.pauseAsync()
        console.log('10 stopped')
    }


    return (
        <View>
            <Text onPress={() => record()}>
                record
            </Text>
            <Text onPress={() => stopRecording()}>
                stop recording
            </Text>
            <Text onPress={() => getAudio()}>
                get audio
            </Text>
            <Text onPress={() => playAudio()}>
                play audio
            </Text>
            <Text onPress={() => stopAudio()}>
                stop audio
            </Text>
        </View>
    )
}

export default Recorded
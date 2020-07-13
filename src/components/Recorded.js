import React from 'react'
import { Audio } from 'expo-av'
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux'
import getAudioSelectors from '../redux/selectors/audioSelectors';
import { setAudioAction, setIsPlayingAction, setAllAudioAction } from '../redux/actions/audioActions'
import { setRecordSettings } from '../services/audioSettings'
import { saveAudioToDB } from '../services/services'


const Recorded = () => {

    const dispatch = useDispatch()
    let audio = getAudioSelectors('audio')
    // let allAudios = getAudioSelectors('allAudios')
    let recording = {}

    const startRecording = async () => {
        let { status, granted } = await Audio.requestPermissionsAsync()
        console.log('1: status: ' + status + ', granted: ' + granted)
        recording = new Audio.Recording()
        setRecordSettings()
        try {
            await recording.prepareToRecordAsync();
            await recording.startAsync();
            console.log('2: recording')
        } catch (error) {
            console.log('2: not recording: ' + error)
        }
    }

    const stopRecording = async () => {
        await recording.stopAndUnloadAsync()
        console.log('3: stopped recording: ' + recording._finalDurationMillis)

        let tempAudio = await recording.createNewLoadedSoundAsync()
        tempAudio ={
            sound: tempAudio.sound,
            duration : (recording._finalDurationMillis / 1000).toFixed(1),
            language: 'default language',
            genre: 'default genre',
            title: 'default title'
        }
        // tempAudio.duration = (recording._finalDurationMillis / 1000).toFixed(1)

        await setAudioAction(tempAudio, dispatch)
        // await setAllAudioAction(audio, dispatch)

        // saveAudioToDB(audio)   
    }


    return (
        <View>
            <Text></Text>
            <Text onPress={() => startRecording()}>
                record
            </Text>
            <Text></Text>
            <Text onPress={() => stopRecording()}>
                stop recording
            </Text>
            <Text></Text>

        </View>
    )
}

export default Recorded
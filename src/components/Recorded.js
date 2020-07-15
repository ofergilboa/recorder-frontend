import React from 'react'
import { Audio } from 'expo-av'
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'
import getAudioSelectors from '../redux/selectors/audioSelectors';
import { setAudioAction, setIsPlayingAction, setAllAudioAction } from '../redux/actions/audioActions'
import { setRecordSettings } from '../services/audioSettings'
import { saveAudioToDB } from '../services/services'
const moment = require('moment')
require('moment/locale/en-il')
moment.locale('en-il')


const Recorded = () => {

    const dispatch = useDispatch()
    let audio = getAudioSelectors('audio')
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
        tempAudio = {
            sound: tempAudio.sound,
            duration: (recording._finalDurationMillis / 1000).toFixed(1),
            language: 'English',
            genre: 'all',
            title: 'title',
            id: Math.random().toString(),
            date: moment().format('l'),
            hour: moment().format('LTS')
        }
        await setAudioAction(tempAudio, dispatch)

        // await setAllAudioAction(audio, dispatch)
        // saveAudioToDB(audio)   
    }


    return (
        <View style={styles.recordBar}>
            <Text onPress={() => startRecording()}>
                record
            </Text>
            <Text onPress={() => stopRecording()}>
                stop recording
            </Text>
            <Text onPress={() => setAllAudioAction(audio, dispatch)}>
                save
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    recordBar: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#b0c4de",
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",

    }
})

export default Recorded
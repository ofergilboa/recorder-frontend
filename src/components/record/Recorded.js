import React from 'react'
import { Audio } from 'expo-av'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import getAudioSelectors from '../../redux/selectors/audioSelectors';
import { setAudioAction, setIsPlayingAction, setAllAudioAction, addAudioAction } from '../../redux/actions/audioActions'
import { setRecordSettings } from '../../services/audioSettings'
import { saveAudioToDB } from '../../services/services'
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
            key: Math.random().toString(),
            date: moment().format('l'),
            hour: moment().format('LTS')
        }
        await setAudioAction(tempAudio, dispatch)

        // await addAudioAction(audio, dispatch)
        // saveAudioToDB(audio)   
    }

    const save = async () => {
        // addAudioAction(audio, dispatch)
        saveAudioToDB(audio, dispatch)
    }


    return (
        <View style={styles.recordBar}>
            <TouchableOpacity>
                <Text onPress={startRecording}>
                    record
                </Text>
            </TouchableOpacity>
            <TouchableOpacity>

                <Text onPress={stopRecording}>
                    stop recording
                </Text>
            </TouchableOpacity>
            <TouchableOpacity>

                <Text onPress={save}>
                    save
                </Text>
            </TouchableOpacity>
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
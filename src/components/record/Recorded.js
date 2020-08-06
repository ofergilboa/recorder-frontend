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
        let uri = await recording.getURI()
        let source = { uri: uri }
        console.log('111111'+ source.uri)

        // console.log('0000 uri: ' + uri)
        console.log('3: stopped recording: ' + recording._finalDurationMillis)

        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(source)
        setTimeout(function () {
            soundObject.playAsync()
        }, 2000)

        // let tempAudio = await recording.createNewLoadedSoundAsync()
        tempAudio = {
            // sound: tempAudio.sound,
            duration: (recording._finalDurationMillis / 1000).toFixed(1),
            language: 'English',
            genre: 'all',
            title: 'title',
            key: Math.random().toString(),
            date: moment().format('l'),
            hour: moment().format('LTS'),
            source : source,
            createdBy: 'userID'
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
            <Text onPress={startRecording}>
                record
            </Text>
            <Text onPress={stopRecording}>
                stop recording
            </Text>
            <Text onPress={save}>
                save
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    recordBar: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#b0c4de",
        // borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%"
    }
})

export default Recorded
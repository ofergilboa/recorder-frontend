import React, { useState } from 'react'
import { Audio } from 'expo-av'
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useDispatch } from 'react-redux'
import getAudioSelectors from '../../redux/selectors/audioSelectors';
import goalsSelectors from '../../redux/selectors/goalsSelectors';
import { setAudioAction, setIsPlayingAction, setAllAudioAction, addAudioAction } from '../../redux/actions/audioActions'
import { setRecordSettings } from '../../services/audioSettings'
import { saveAudioToDB } from '../../services/services'
const moment = require('moment')
require('moment/locale/en-il')
moment.locale('en-il')


const Recorded = () => {

    const [random, setRandom] = useState(5)

    const dispatch = useDispatch()
    let audio = getAudioSelectors('audio')
    const enteredGoal = goalsSelectors('enteredGoal')
    let recording = {}
    let isRecording = false

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
        // setRandom(7)
        // await console.log(random)
        isRecording = true
    }

    const stopRecording = async () => {
        console.log(9999 + recording)
        await recording.stopAndUnloadAsync()
        let uri = await recording.getURI()
        let source = { uri: uri }
        console.log('111111' + source.uri)

        // console.log('0000 uri: ' + uri)
        console.log('3: stopped recording: ' + recording._finalDurationMillis)

        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(source)
        // setTimeout(function () {
        //     soundObject.playAsync()
        // }, 2000)

        let temp = await recording.createNewLoadedSoundAsync()
        let tempAudio = {
            sound: temp.sound,
            duration: (recording._finalDurationMillis / 1000).toFixed(1),
            language: 'English',
            genre: 'all',
            title: enteredGoal,
            key: Math.random().toString(),
            date: moment().format('l'),
            hour: moment().format('LTS'),
            source: source,
            createdBy: 'userID'
        }
        await setAudioAction(tempAudio, dispatch)
        // await addAudioAction(tempAudio, dispatch)
        // saveAudioToDB(audio)

        isRecording = false
    }

    const save = async () => {
        // addAudioAction(audio, dispatch)
        saveAudioToDB(audio, dispatch)
    }

    return (
        <View style={styles.recordBar}>
            {!isRecording ?
                <Button color='green' onPress={startRecording} title='record' />
                : <Button color='red' onPress={stopRecording} title='stop recording' />
            }
            <Button color='red' onPress={stopRecording} title='stop recording' />
        </View>
    )
}

const styles = StyleSheet.create({
    recordBar: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#f5f5f5",
        // borderRadius: 4,
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
    },

})

export default Recorded
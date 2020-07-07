import React from 'react'
import { Audio } from 'expo-av'
import { Text, View } from 'react-native';
import axios from 'axios'
// import { request } from 'express';


export const route = 'http://10.0.2.2:8181/'

const Recorded = () => {

    let recording = {}
    let audio = {}
    let uri = ''


    const record = async () => {

        let { status, granted } = await Audio.requestPermissionsAsync()
        console.log('status: ' + status + ', granted: ' + granted)

        recording = new Audio.Recording();
        Audio.setAudioModeAsync({
            allowsRecordingIOS: true
        })
        console.log(recording)

        try {
            await recording.prepareToRecordAsync();
            await recording.startAsync();
            console.log('recording')

        } catch (error) {
            console.log(error)
            console.log('not recording')
        }
        // console.log(recording)
    }

    const stopRecording = async () => {
        await recording.stopAndUnloadAsync()
        console.log('stopped recording: ' + recording["_finalDurationMillis"])
        // const saveRecording = {
        //     "duration": recording["_finalDurationMillis"],
        //     "sound": recording["sound"]
        // }
        // console.log(saveRecording)
        uri = await recording.getURI()
        console.log('uri: ' + uri)
        // await axios.post(`${route}recording`, saveRecording)
        audio = await recording.createNewLoadedSoundAsync()
        audio = audio.sound
        console.log(audio.sound)
    }

    const getAudio = async () => {
        // let source = require('../assets/SoundHelix-Song-2.mp3')
        // let source = { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
        // let source = require(uri)
        audio = new Audio.Sound()
        try {
            // await audio.loadAsync(source)
            console.log('loaded: ' + uri)

        } catch (error) {
            console.log('error: ' + error)
        }
    }

    const playAudio = async () => {
        await audio.playAsync()
        console.log('play')
        // console.log('recording: ' + recording["_finalDurationMillis"])
        console.log('audio: ' + audio)
    }

    const stopAudio = async () => {
        audio.pauseAsync()
        console.log('stopped')
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
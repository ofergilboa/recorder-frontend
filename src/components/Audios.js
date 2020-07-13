import React from 'react'
import { Audio } from 'expo-av'
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux'
import getAudioSelectors from '../redux/selectors/audioSelectors';
import { setAudioAction, setIsPlayingAction, setAllAudioAction } from '../redux/actions/audioActions'
import { setRecordSettings } from '../services/audioSettings'
import { saveAudioToDB } from '../services/services'
import AudioObj from './AudioObj';

const Audios = () => {

    const dispatch = useDispatch()
    let audio = getAudioSelectors('audio')
    let allAudios = getAudioSelectors('allAudios')

    const getAudio = async () => {
        let source = require('../assets/SoundHelix-Song-2.mp3')
        // let source = { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
        // let source = require(uri)
        audio = new Audio.Sound()
        try {
            await audio.sound.loadAsync(source)
            console.log('loaded: ' + uri)
        } catch (error) {
            console.log('error: ' + error)
        }
    }

    const playAudio = async () => {
        await setAllAudioAction(audio, dispatch)
        await audio.sound.playAsync()
        console.log('4: playing')
        console.log(`5: duration: ${audio.duration} seconds`)
    }

    const stopAudio = async () => {
        console.log(`6: ${allAudios[0].duration}`)
        audio.sound.pauseAsync()
        console.log('7: stopped plying')
    }

    return (
        <View>
            <Text onPress={() => getAudio()}>
                get audio
            </Text>
            <Text></Text>
            <Text onPress={() => playAudio()}>
                play audio
            </Text>
            <Text></Text>
            <Text onPress={() => stopAudio()}>
                stop audio
            </Text>
            <Text></Text>
            {allAudios.map((audio, i) => <AudioObj audio={audio} key={i} />)}
        </View>
    )
}

export default Audios
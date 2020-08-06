import React from 'react'
import { Audio } from 'expo-av'
import { Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux'
import getAudioSelectors from '../../redux/selectors/audioSelectors';
import { setAudioAction, setIsPlayingAction, setAllAudioAction, addAudioAction } from '../../redux/actions/audioActions'
import { setRecordSettings } from '../../services/audioSettings'
import { saveAudioToDB } from '../../services/services'
import AudioObj from './AudioObj';

const AudioBar = () => {

    const dispatch = useDispatch()
    let audio = getAudioSelectors('audio')
    let allAudios = getAudioSelectors('allAudios')

    const getAudio = async () => {
        // let source = require('../../assets/SoundHelix-Song-2.mp3')
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
        // await addAudioAction(audio, dispatch)
        await audio.sound.playAsync()
        console.log(`4: playing: ${audio.duration} seconds`)
        setTimeout(function () {
            audio.sound.stopAsync()
            console.log('stopped plying')
        }, audio.duration * 1000)
        // saveAudioToDB(audio)   
    }

    const stopAudio = async () => {
        audio.sound.stopAsync()
        console.log('5: stopped plying')
    }

    return (
        <View>
            <View style={styles.audioBar}>
                {/* <Text onPress={() => getAudio()}>
                get audio
            </Text> */}
                <Text onPress={() => playAudio()}>
                    play audio
            </Text>
                <Text onPress={() => stopAudio()}>
                    stop audio
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    audioBar: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#b0c4de",
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 15,
    },
    allAudios: {
        maxHeight: '77%'
    }
})

export default AudioBar
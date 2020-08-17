import React, {useState} from 'react'
import { Audio } from 'expo-av'
import { Text, View, ScrollView, StyleSheet, FlatList, Button } from 'react-native';
import { useDispatch } from 'react-redux'
import getAudioSelectors from '../../redux/selectors/audioSelectors';
import { setAudioAction, setIsPlayingAction, setAllAudioAction, addAudioAction } from '../../redux/actions/audioActions'
import { setRecordSettings } from '../../services/audioSettings'
import { saveAudioToDB } from '../../services/services'
import AudioObj from './AudioObj';

const AudioBar = () => {

    const dispatch = useDispatch()
    let audio = getAudioSelectors('audio')
    let [playing, setPlaying] = useState(false)
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
        playing = true
        setTimeout(function () {
            audio.sound.stopAsync()
            console.log('stopped plying')
            playing = false
        }, audio.duration * 1000)
        // saveAudioToDB(audio)   
        setPlaying(true)
    }

    const stopAudio = async () => {
        audio.sound.stopAsync()
        console.log('5: stopped plying')
        setPlaying(false)

    }

    return (
        <View style={styles.audioBar}>
            {audio.sound ?
                <View >
                    {!playing ?
                        <Button color='green' onPress={() => playAudio()} title='play audio' />
                        : <Button color='red' onPress={() => stopAudio()} title='stop audio' />
                    }
                </View>
                : <Button color='grey' title='play audio' />}
        </View>
    )
}

const styles = StyleSheet.create({
    audioBar: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#f5f5f5",
        borderRadius: 0,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 15,
        width: "100%"

    },
    allAudios: {
        maxHeight: '77%'
    }
})

export default AudioBar
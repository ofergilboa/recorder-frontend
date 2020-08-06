import React from 'react'
import { StyleSheet, Text, View, Touchable, TouchableOpacity } from 'react-native';
import { deleteAudio } from '../../services/services';
import { useDispatch } from 'react-redux'
import { Audio } from 'expo-av'



const AudioObj = (props) => {

    const dispatch = useDispatch()

    const play = async () => {

        // let source = { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
        let source = { uri: props.audio.source }
        const soundObject = new Audio.Sound()
        try {
            await soundObject.loadAsync(source)
            console.log('loaded: ' + source.uri)
        } catch (error) {
            console.log('error: ' + error)
        }
        soundObject.playAsync()

        setTimeout(function () {
            soundObject.stopAsync()
        }, props.audio.duration * 1000)
    }

    return (
        <View style={styles.audioObj}>
            <View style={styles.audioTitle}>
                <Text style={styles.audioTitleText}>{props.audio.title}</Text>
                <View style={styles.audioPlay}>
                    <Text style={styles.play} onPress={() => play()}>play</Text>
                    <Text style={styles.xButton} onPress={() => deleteAudio(props.audio.key, dispatch)}> X </Text>
                </View>
            </View>
            <View style={styles.audioDetails}>
                <Text>{props.audio.language}</Text>
                <Text>{props.audio.genre}</Text>
                <Text>{props.audio.date}</Text>
                <Text>{props.audio.hour ? props.audio.hour.slice(0, 5) : null}</Text>
                <Text>{props.audio.duration}s</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    audioObj: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        // marginBottom: 10,
        // backgroundColor: "#f5f5f5",
        // borderRadius: 4,
        minHeight: 85,
        borderBottomWidth:1,
        borderBottomColor: "#1e90ff",
        borderTopColor: "#1e90ff",
        // borderTopWidth: 1,

    },
    audioTitle: {
        // marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    audioTitleText: {
        fontSize: 22,
        width: "75%",
        // fontWeight:"bold"
        fontWeight: "bold"
    },
    audioDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    play: {
        fontWeight: "bold"
    },
    xButton: {
        backgroundColor: "#f8f8ff",
        borderRadius: 2,
        fontWeight: "bold"
    },
    audioPlay: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        width: "17%"
    }
})

export default AudioObj
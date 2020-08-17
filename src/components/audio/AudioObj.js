import React, { useState } from 'react'
import { StyleSheet, Text, View, Touchable, TouchableOpacity, Modal, Button } from 'react-native';
import { deleteAudio } from '../../services/services';
import { useDispatch } from 'react-redux'
import { Audio } from 'expo-av'



const AudioObj = (props) => {

    const [displayObj, setDisplayObj] = useState(false)
    let [playing, setPlaying] = useState(false)
    let soundObject = {}

    const dispatch = useDispatch()

    const play = async () => {

        // let source = { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
        let source = { uri: props.audio.source }
        soundObject = new Audio.Sound()
        try {
            await soundObject.loadAsync(source)
            console.log('loaded: ' + source.uri)
        } catch (error) {
            console.log('error: ' + error)
        }
        soundObject.playAsync()
        setPlaying(true)

        setTimeout(function () {
            soundObject.stopAsync()
            setPlaying(false)
        }, props.audio.duration * 1000)
    }

    const changeDisplayObj = () => {
        console.log(888888)
        setDisplayObj(!displayObj)
    }

    const stopAudio = async () => {
        soundObject.stopAsync()
        console.log('5: stopped plying')
        setPlaying(false)
    }

    return (
        <View style={styles.audioObj}>
            <View style={styles.audioTitle} onPress={changeDisplayObj} accessibilityRole='button' >
                <Text style={styles.audioTitleText} onPress={changeDisplayObj} >{props.audio.title}</Text>
                {/* <Button style={styles.audioTitleText} title={props.audio.title} onPress={changeDisplayObj} /> */}
                <View style={styles.audioPlay}>
                    <Text>{props.audio.duration}s</Text>
                </View>
            </View>
            {displayObj ?
                <View style={styles.audioDetails}>
                    {/* <Text>{props.audio.language}</Text>
                <Text>{props.audio.genre}</Text> */}
                    <Text>{props.audio.date}</Text>
                    <Text>{props.audio.hour ? props.audio.hour.slice(0, 5) : null}</Text>
                    {!playing ? <Text style={styles.play} onPress={() => play()}>play</Text>
                        : <Text style={styles.stop} onPress={() => stopAudio()}>stop</Text>
                    }
                    <Text style={styles.xButton} onPress={() => deleteAudio(props.audio.key, dispatch)}>delete</Text>
                </View>
                : null}
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
        minHeight: 55,
        // borderBottomWidth:1,
        borderTopWidth: 1,
        borderBottomColor: "#1e90ff",
        borderTopColor: "#1e90ff",
    },
    audioTitle: {
        // marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    audioTitleText: {
        // backgroundColor: "#f5f5f5",
        color: "#1e90ff",
        fontSize: 22,
        // fontWeight:"bold"
        fontWeight: "bold",
        minWidth: 100,
        maxWidth: "75%",
        // paddingHorizontal:10,
        paddingVertical: 5
    },
    audioDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },
    play: {
        fontWeight: "bold",
        color: "green",
    },
    stop: {
        fontWeight: "bold",
        color: "red",
    },
    xButton: {
        backgroundColor: "black",
        color: "white",
        paddingHorizontal: 3,
        borderRadius: 2,
        fontWeight: "bold"
    },
    audioPlay: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        width: "10%"
    }
})

export default AudioObj
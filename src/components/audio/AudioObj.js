import React from 'react'
import { StyleSheet, Text, View, Touchable, TouchableOpacity } from 'react-native';



const AudioObj = (props) => {
    return (
        <View style={styles.audioObj}>
            <View style={styles.audioTitle}>
                <Text style={styles.audioTitleText}>{props.audio.title}</Text>
                <Text>{props.audio.duration}s</Text>
            </View>
            <View style={styles.audioDetails}>
                <Text>{props.audio.language}</Text>
                <Text>{props.audio.genre}</Text>
                <Text>{props.audio.date}</Text>
                <Text>{props.audio.hour ? props.audio.hour.slice(0, 5) : null}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    audioObj: {
        flexDirection: "column",
        alignContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        backgroundColor: "#ccc",
        borderRadius: 4,
    },
    audioTitle: {
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    audioTitleText: {
        fontSize: 22,
        // fontWeight:"bold"
    },
    audioDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
    }

})

export default AudioObj
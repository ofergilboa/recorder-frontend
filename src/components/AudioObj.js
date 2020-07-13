import React from 'react'
import { Text, View } from 'react-native';


const AudioObj = (props) => {

    return (

        <View>
            <Text>
                duration: {props.audio.duration} seconds
            </Text>
        </View>

    )
}

export default AudioObj
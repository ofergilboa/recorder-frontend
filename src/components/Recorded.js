import React from 'react'
import { Audio } from 'expo-av'
import { Text, View } from 'react-native';
import axios from 'axios'


export const route = 'http://10.0.2.2:8181/'

const Recorded = () => {

    let recording = {}

    const requestPermission = async () => {
        let { status, granted } = await Audio.requestPermissionsAsync()
        console.log('status: ' + status + ', granted: ' + granted)
    }

    const record = async () => {

        recording = new Audio.Recording();
        console.log(recording)
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            console.log('recording')

        } catch (error) {
            console.log(error)
            console.log('not recording')
        }

    }

    const stopRecording = async () => {
        await recording.stopAndUnloadAsync()
        console.log('stopped recording: ' + recording["_finalDurationMillis"])
        const saveRecording = {
            "_canRecord": recording["_canRecord"],
            "_cleanupForUnloadedRecorder": recording["_cleanupForUnloadedRecorder"],
            "_finalDurationMillis": recording["_finalDurationMillis"],
            "_isDoneRecording": recording["_isDoneRecording"],
            "_onRecordingStatusUpdate": recording["_onRecordingStatusUpdate"],
            "_options": recording["_options"],
            "_pollingLoop": recording["_pollingLoop"],
            "_progressUpdateIntervalMillis": recording["_progressUpdateIntervalMillis"],
            "_progressUpdateTimeoutVariable": recording["_progressUpdateTimeoutVariable"],
            "_subscription": recording["_subscription"],
            "_uri": recording["_uri"],
            "getStatusAsync": recording["getStatusAsync"],
        }
        await axios.post(`${route}recording`, saveRecording)

    }

    return (
        <View>
            <Text onPress={() => requestPermission()}>
                request permission
            </Text>
            <Text onPress={() => record()}>
                record
            </Text>
            <Text onPress={() => stopRecording()}>
                stop recording
            </Text>
        </View>
    )
}

export default Recorded
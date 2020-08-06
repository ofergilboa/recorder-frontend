import React from 'react'
import { Audio } from 'expo-av'
import { Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux'
import getAudioSelectors from '../../redux/selectors/audioSelectors';
import { setAudioAction, setIsPlayingAction, setAllAudioAction } from '../../redux/actions/audioActions'
import { setRecordSettings } from '../../services/audioSettings'
import { saveAudioToDB } from '../../services/services'
import AudioObj from './AudioObj';

const Audios = () => {

    // const dispatch = useDispatch()
    // let audio = getAudioSelectors('audio')
    let allAudios = getAudioSelectors('allAudios')

    return (
        <View>
            <View style={styles.allAudios}>
                {allAudios[0]
                    // ? <FlatList
                    //     data={allAudios}
                    //     renderItem={(audio) => <AudioObj audio={audio} />}
                    //     keyExtractor={audio => { audio.id }}
                    // />
                    ? <ScrollView>{allAudios.map((audio, i) => <AudioObj audio={audio} key={i} />)}</ScrollView>
                    : <Text>no audios recorded yet</Text>
                }
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
        marginBottom: 10,
    },
    allAudios:{
        marginBottom: -10,
        // maxHeight: '77%',
        // height: '75%'
    }
})

export default Audios
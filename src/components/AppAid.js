import React, { useEffect } from 'react'
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import GoalInput from './goals/GoalInput'
import SearchGoals from './goals/SearchGoals'
import GoalItems from './goals/GoalItems'
import { useDispatch } from 'react-redux'
import { setIsAddGoalAction } from '../redux/actions/goalsActions'
import { getAllGoals, getAllAudios } from '../services/services'
import Recorded from './record/Recorded'
import AudioBar from './audio/AudioBar'
import Audios from './audio/Audios'

const AppAid = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        getAllAudios(dispatch)
        getAllGoals(dispatch)
    }, [])

    return (
        <View style={styles.screen}>
            <Button title="add audio" onPress={() => setIsAddGoalAction(true, dispatch)} />
            <SearchGoals />
            {/* <Recorded /> */}
            {/* <AudioBar /> */}
            <ScrollView>
                <Audios />
                <GoalInput />
                <GoalItems />
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop:40,
        padding: 15,
        // paddingTop: 40,
        paddingBottom: 15,
        flex: 1
    },

});

export default AppAid



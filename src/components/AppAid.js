import React, { useEffect } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import GoalInput from './GoalInput'
import SearchGoals from './SearchGoals'
import GoalItems from './GoalItems'
import { useDispatch } from 'react-redux'
import { setIsAddGoalAction } from '../redux/actions/goalsActions'
import { getAllGoals } from '../services/services'
import Recorded from './Recorded'
import Audios from './Audios'

const AppAid = () => {

    const dispatch = useDispatch()

    useEffect(() => { getAllGoals(dispatch) }, [])

    return (
        <View style={styles.screen}>
            <Button title="record audio" onPress={() => setIsAddGoalAction(true, dispatch)} />
            <SearchGoals />
            <Recorded/>
            <Audios/>
            <GoalInput />
            <GoalItems />
        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 30,
        // paddingTop: 40,
        paddingBottom: 15,
        flex:1
    },

});

export default AppAid



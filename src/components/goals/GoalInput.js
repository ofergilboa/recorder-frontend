import React from 'react';
import axios from 'axios'
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';
import { setIsAddGoalAction, setEnteredGoalAction } from '../../redux/actions/goalsActions'
import { setAudioAction } from '../../redux/actions/audioActions'
import { useDispatch } from 'react-redux'
import goalsSelectors from '../../redux/selectors/goalsSelectors'
import getAudioSelectors from '../../redux/selectors/audioSelectors'
import { addGoal, saveAudioToDB } from '../../services/services'
import Recorded from '../record/Recorded';
import AudioBar from '../audio/AudioBar';

const GoalInput = props => {

    const dispatch = useDispatch()
    const isAddGoal = goalsSelectors('isAddGoal')
    const enteredGoal = goalsSelectors('enteredGoal')
    let audio = getAudioSelectors('audio')


    const changeIsAddGoal = (boolean) => {
        setIsAddGoalAction(boolean, dispatch)
    }

    const inputHandler = (text) => {
        setEnteredGoalAction(text, dispatch)
    }

    const onSave = () => {
        // addGoal(enteredGoal, dispatch);
        if (audio) {
            audio.title = enteredGoal ? enteredGoal : 'name the song'
            saveAudioToDB(audio, dispatch)
            inputHandler('')
            changeIsAddGoal(false)
            setAudioAction('', dispatch)
        } else {
            alert('you need to record something first')
        }
    }

    const onCancel = () => {
        changeIsAddGoal(false);
        inputHandler('')
        setAudioAction('', dispatch)
    }

    return (
        < Modal visible={isAddGoal} animationType={"slide"} >
            <View style={styles.topContainer}>
                <TextInput
                    placeholder="what do you know about the song?"
                    style={styles.input}
                    onChangeText={inputHandler}
                    value={enteredGoal} />
                <View style={styles.record}>
                    <Recorded />
                    <AudioBar />
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title='CANCEL' color='red'
                            onPress={onCancel} />
                    </View>
                    <View style={styles.button}>
                        <Button title="SAVE"
                            onPress={onSave}
                        />
                    </View>
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
        alignItems: 'center',
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '80%',
        margin: 10,
    },
    button: {
        width: '40%',
        margin: 10,
        //   borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ccc'
    },
    input: {
        width: '80%',
        borderColor: "black",
        borderWidth: 1,
        padding: 10
    },
    record: {
        width: '80%',

    }
})

export default GoalInput
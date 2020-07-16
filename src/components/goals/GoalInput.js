import React from 'react';
import axios from 'axios'
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';
import { setIsAddGoalAction, setEnteredGoalAction } from '../../redux/actions/goalsActions'
import { useDispatch } from 'react-redux'
import goalsSelectors from '../../redux/selectors/goalsSelectors'
import { addGoal } from '../../services/services'

const GoalInput = props => {

    const dispatch = useDispatch()
    const isAddGoal = goalsSelectors('isAddGoal')
    const enteredGoal = goalsSelectors('enteredGoal')

    const changeIsAddGoal = (boolean) => {
        setIsAddGoalAction(boolean, dispatch)
    }

    const inputHandler = (text) => {
        setEnteredGoalAction(text, dispatch)
    }

    return (
        < Modal visible={isAddGoal} animationType={"slide"} >
            <View style={styles.topContainer}>
                <TextInput
                    placeholder="course goals"
                    style={styles.input}
                    onChangeText={inputHandler}
                    value={enteredGoal} />
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title='CANCEL' color='red'
                            onPress={() => {
                                changeIsAddGoal(false);
                                inputHandler('')
                            }} />
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD"
                            onPress={() => {
                                addGoal(enteredGoal, dispatch);
                                inputHandler('')
                            }}
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
    }
})

export default GoalInput
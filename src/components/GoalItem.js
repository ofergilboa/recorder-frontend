import React from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, Touchable, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux'
import { deleteGoal} from '../services/services'


const GoalItem = props => {

    const dispatch = useDispatch()

    return (
        <View style={styles.listItem}>
            <Text>{props.item}</Text>   
            <TouchableOpacity style={styles.xButton} onPress={() => deleteGoal(props.id, dispatch)}>
                <Text> X </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        marginTop: 15,
        // marginVertical: 10,
        backgroundColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 4,
        
    },
    xButton:{
        backgroundColor: "#f8f8ff",
        borderRadius: 2
    }
})

export default GoalItem
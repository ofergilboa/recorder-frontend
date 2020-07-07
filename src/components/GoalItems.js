import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native';
import GoalItem from './GoalItem';
import getSelectors from '../redux/selectors'


const GoalItems = props => {

    const searchField = getSelectors('searchField')
    const goals = getSelectors('goals')

    const filteredGoals = goals.filter(g => g.item.includes(searchField))

    return (
        <ScrollView style={styles.listItems}>
            {filteredGoals.map((goal) => (
                <GoalItem
                    item={goal.item}
                    id={goal.key}
                    key={goal.key}
                >
                </GoalItem>))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    listItems: {
        marginTop: 15,
    }
})


export default GoalItems

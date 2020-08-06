import React from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { setSearchFieldAction } from '../../redux/actions/goalsActions'

const SearchGoals = () => {

    const dispatch = useDispatch()

    function handleChange(text) {
        setSearchFieldAction(text, dispatch)
    }

    return (
        <View style={styles.searchInput}>
            <TextInput
                placeholder='search'
                onChangeText={handleChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        width: '100%',
        borderWidth: 3,
        borderColor: "#b0c4de",
        marginTop: 10,
        marginBottom: 20,
        padding: 2,
        paddingLeft: 10,
        borderRadius: 4,

    }
})


export default SearchGoals
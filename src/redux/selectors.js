import { useSelector } from 'react-redux'

const getSelectors = (value) => {

    switch (value) {
        case 'isAddGoal':
            return (useSelector(state => (
                state.GoalsReducer.isAddGoal)))
        case 'enteredGoal':
            return (useSelector(state => (
                state.GoalsReducer.enteredGoal)))
        case 'searchField':
            return (useSelector(state => (
                state.GoalsReducer.searchField)))
        case 'goals':
            return (useSelector(state => (
                state.GoalsReducer.goals)))
        default:
            return value
    }
}


export default getSelectors
import {
    CHANGE_SEARCH_FIELD,
    CHANGE_IS_ADD_GOAL,
    CHANGE_ENTERED_GOAL,
    SET_ALL_GOALS
} from '../constants'


export const setSearchFieldAction = (text, dispatch) => {
    dispatch({
        type: CHANGE_SEARCH_FIELD,
        payload: text
    })
}

export const setIsAddGoalAction = (boolean, dispatch) => {
    dispatch({
        type: CHANGE_IS_ADD_GOAL,
        payload: boolean
    })
}

export const setEnteredGoalAction = (goal, dispatch) => {
    dispatch({
        type: CHANGE_ENTERED_GOAL,
        payload: goal
    })
}

export const setAllGoalsAction = (goals, dispatch) => {
    dispatch({
        type: SET_ALL_GOALS,
        payload: goals
    })
}


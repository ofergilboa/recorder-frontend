import axios from 'axios'
import { setIsAddGoalAction, setAllGoalsAction } from '../redux/actions'

export const route = 'http://10.0.2.2:8181/'

export const getAllGoals = async (dispatch) => {
    console.log('getting all goals')
    let res = await axios.get(`${route}items`)
    const goals = res.data
    setAllGoalsAction(goals, dispatch)
    console.log('got all goals')
}

export const addGoal = async (goalTitle, dispatch) => {
    let key = Math.random().toString()
    let newItem = { key: key, item: goalTitle }
    await axios.post(`${route}item`, newItem)
    await getAllGoals(dispatch)
    await setIsAddGoalAction(false, dispatch)
}

export const deleteGoal = async (id, dispatch) => {
    await axios.delete(`${route}item/${id}`)
    getAllGoals(dispatch)
}
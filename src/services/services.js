import axios from 'axios'
import { setIsAddGoalAction, setAllGoalsAction } from '../redux/actions/goalsActions'
import { setAllAudioAction } from '../redux/actions/audioActions'


// export const route = 'http://10.0.2.2:8181/' //local
export const route = '/' //herokus

//goals

export const getAllGoals = async (dispatch) => {
    // console.log('getting all goals')
    let res
    try {
        res = await axios.get(`${route}items`)
    } catch (error) {
        console.log(error)
    }
    const goals = res.data
    setAllGoalsAction(goals, dispatch)
    console.log('got all goals')
}

export const addGoal = async (goalTitle, dispatch) => {
    let key = Math.random().toString()
    let newItem = { key: key, item: goalTitle }
    try {
        await axios.post(`${route}item`, newItem)
    } catch (error) {
        console.log(error)
    }
    await getAllGoals(dispatch)
    await setIsAddGoalAction(false, dispatch)
}

export const deleteGoal = async (id, dispatch) => {
    await axios.delete(`${route}item/${id}`)
    getAllGoals(dispatch)
}


//audio

export const getAllAudios = async (dispatch) => {
    console.log('getting all audios')
    let res
    try {
        res = await axios.get(`${route}audio`)
    } catch (error) {
        console.log(error)
    }
    const audios = res.data
    setAllAudioAction(audios, dispatch)
    console.log('got all audios')
}

export const saveAudioToDB = async (obj, dispatch) => {
    console.log('saving: ' + obj.sound)
    const saveAudio = {
        // "sound": obj.sound,
        "title": obj.title,
        "date": obj.date,
        "duration": obj.duration,
        "genre": obj.genre,
        "hour": obj.hour,
        "key": obj.key,
        "language": obj.language,
        "source": obj.source.uri,
        "createdBy": obj.createdBy
    }
    console.log('----- saving')
    try {
        await axios.post(`${route}audio`, saveAudio)
    } catch (error) {
        console.log(error)
    }
    getAllAudios(dispatch)
}

export const deleteAudio = async (key, dispatch) => {
    try {
        await axios.delete(`${route}audio/${key}`)
        getAllAudios(dispatch)
    } catch (error) {
        console.log(error)
    }
}

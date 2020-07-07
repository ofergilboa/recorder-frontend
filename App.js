import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { GoalsReducer } from './src/redux/reducers'
import AppAid from './src/components/AppAid'


const rootReducer = combineReducers({
    GoalsReducer
})

const store = createStore(rootReducer)

const App = function App() {
    return (
        <Provider store={store}>
            <AppAid />
        </Provider>
    );
}

export default App

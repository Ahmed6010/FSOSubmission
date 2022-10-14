import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteReducer'
import notificationSlice from './reducers/notificationReducer'
import filterSlice from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes : anecdoteSlice,
    message : notificationSlice,
    filter : filterSlice
  }
})

export default store
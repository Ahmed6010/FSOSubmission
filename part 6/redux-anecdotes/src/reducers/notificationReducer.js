import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeMessage(state, action){
      return action.payload
    },
    removeMessage(state, action){
      return null
    }
  }
})

let timeoutID
export const setNotification = (text, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch(changeMessage(text))
    timeoutID = setTimeout(() => {
      dispatch(removeMessage())
    }, time * 1000)
  }
}

export const { changeMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer
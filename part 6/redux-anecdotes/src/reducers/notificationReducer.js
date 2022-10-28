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


export const setNotification = (text, time) => {
  return async dispatch => {
    dispatch(changeMessage(text))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time * 1000)
  }
}

export const { changeMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer
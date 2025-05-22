import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
}

const initialState: UserState = {
  name: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    resetUser: () => initialState,
  },
})

export const { setUserName, resetUser } = userSlice.actions
export default userSlice.reducer

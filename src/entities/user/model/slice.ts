import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from './types'

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        clearUser: (state) => {
            state.user = null
            state.isAuthenticated = false
        },
    },
})

export const { clearUser, setUser } = userSlice.actions

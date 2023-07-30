import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:undefined
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        login: (state,action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = undefined;
        }
    }

})

export const {login,logout} = userSlice.actions

export default userSlice.reducer;

export const selectUser = (state) => state.user.user;
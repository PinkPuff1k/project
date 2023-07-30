import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resumes: []
}

export const resumesSlice = createSlice({
    name: 'resumes',
    initialState,
    reducers: {
        setResumes: (state,action) => {
            state.resumes=action.payload;
        }
    }

})

export const { setResumes } = resumesSlice.actions

export default resumesSlice.reducer;

export const selectResumes = (state) => state.resumes.resumes;
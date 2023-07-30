import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    vacancies: []
}

export const vacancySlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setVacancies: (state, action) => {
            state.vacancies = action.payload;
        }
    }

})

export const { setVacancies } = vacancySlice.actions

export default vacancySlice.reducer;

export const selectVacancies = (state) => state.vacancies.vacancies;
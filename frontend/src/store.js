import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "reducers/userReducer";
import resumesReducer from "reducers/resumesReducer";
import vacanciesReducer from "reducers/vacanciesReducer";
import searchReducer from "reducers/searchReducer";

const reducer = combineReducers({
    user: userReducer,
    resumes: resumesReducer,
    vacancies: vacanciesReducer,
    search: searchReducer
})

const store = configureStore({
    reducer
})

export default store
import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setProjects: (state, action) => {
            state.list = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setProjects, setStatus, setError } = projectsSlice.actions;

export default projectsSlice.reducer;

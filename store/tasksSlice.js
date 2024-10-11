import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setTasks: (state, action) => {
            state.list = action.payload;
        },
        deleteTask: (state, action) => {
            state.list = state.list.filter(
                task => task.key !== action.payload.key,
            );
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setTasks, setStatus, setError, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;

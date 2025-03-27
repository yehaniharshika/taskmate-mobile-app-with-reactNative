import { createSlice } from "@reduxjs/toolkit";

interface Task {
    id: string;
    date: string;
    time: string;
    description: string;
    completed: boolean;
}

const initialState: Task[] = [];

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        removeTask: (state, action) => {
            return state.filter((task) => task.id !== action.payload);
        },
    },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;

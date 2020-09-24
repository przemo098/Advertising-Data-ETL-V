import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ITodo {
    id: string;
    text: string;
    completed: boolean;
}
const initialState: ITodo[] = []

const todosSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        addTodo(state, action: PayloadAction<{id: string, text: string}>) {
                const { id, text } = action.payload
                state.push({ id, text, completed: false })
            },
        toggleTodo(state, action) {
            const todo = state.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        }
    }
})

export const addTodoReducer = todosSlice.reducer
export const { addTodo, toggleTodo } = todosSlice.actions

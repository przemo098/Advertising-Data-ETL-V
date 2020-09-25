import {createSlice} from "@reduxjs/toolkit";


const initialValue = {value: false}
const busyIndicatorSlice = createSlice({
    name: 'todos',
    initialState: initialValue,
    reducers: {
        toggleBusyAction(state) {
            state.value = !state.value
        },
    }
})

export const busyIndicatorReducer = busyIndicatorSlice.reducer
export const { toggleBusyAction } = busyIndicatorSlice.actions

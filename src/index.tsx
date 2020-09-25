import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import {configureStore} from "@reduxjs/toolkit";
import {addTodoReducer} from "./app/reducers";
import { combineReducers } from 'redux'
import {chartReducer} from "./app/filterReducer";
import BusyIndicator from "./app/busyIndicator/BusyIndicator";
import {busyIndicatorReducer} from "./app/busyIndicator/busyIndicatorReducer";


const rootReducer = combineReducers({
    todos: addTodoReducer,
    chart: chartReducer,
    busyIndicator: busyIndicatorReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

ReactDOM.render(
    <Provider store={store}>
        <BusyIndicator/>
        <App  />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

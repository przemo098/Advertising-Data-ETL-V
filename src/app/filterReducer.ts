import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IData} from "../DataLoaderService";

export const ChartState: IState = {
    selectedDataSources: [],
    selectedCampaigns: [],
    filteredItems: [],
};

export interface IState {
    selectedDataSources: string[],
    selectedCampaigns: string[],
    filteredItems: IData[]
}


const chartSlice = createSlice({
    name: 'todos',
    initialState: ChartState,
    reducers: {
        setSelectedDataSourcesAction(state, action: PayloadAction<string[]>) {
            state.selectedDataSources = action.payload;
        },
        setSelectedCampaignsAction(state, action: PayloadAction<string[]>) {
            state.selectedCampaigns = action.payload;
        }
    }
})

export const chartReducer = chartSlice.reducer
export const { setSelectedDataSourcesAction, setSelectedCampaignsAction } = chartSlice.actions

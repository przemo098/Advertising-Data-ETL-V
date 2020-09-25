import React, {useEffect, useState} from 'react';
import './App.css';
import {LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid} from 'recharts';
import {IDataFilter, initialize, listCampaignsUnique, displayDataInfo, listDataSourcesUnique} from "./DataLoaderService";
import styled from 'styled-components';
import {Filters} from "./Filter";
import {connect, Provider} from "react-redux";
import {RootStateType} from "./index";

const rand = 300;
const data: Array<any> = [];
for (let i = 0; i < 7; i++) {
    let d = {
        year: 2000 + i,
        value: Math.random() * (rand + 50) + 100
    };

    data.push(d);
}

const Content = styled.div`
  height: 100vh;
  display: table;
  width: 100%;
`

const BodySection = styled.section`
  flex-wrap: wrap;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  top: 0;
  bottom: 0;
`

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center;
  flex-grow: 1
`

function App(props: IAppProps) {
    const [campaigns, setCampaigns] = useState<string[]>([]);
    const [dataSources, setDataSources] = useState<Array<string>>([]);
    useEffect(() => {
        initialize().then(x => {
            setCampaigns(listCampaignsUnique());
            setDataSources(listDataSourcesUnique());
        })
    }, []);

    const filter: IDataFilter = {
        campaigns: props.selectedCampaigns,
        dataSources: props.selectedDataSources
    }
    const displayData = displayDataInfo(filter);
  return (
    <Content>
        <header className="App-header">
        <p>
          Advertising Data ETL-V
        </p>
      </header>
        <BodySection>
            <Filters allCampaigns={campaigns} allDataSources={dataSources} />
            <Chart >
                <LineChart
                    width={1000}
                    height={600}
                    data={displayData.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis yAxisId="left" domain={[0, displayData.maxClicksValue]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, displayData.maxImpressionValue]}/>
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="Clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="Impressions" stroke="#82ca9d" />
                </LineChart>
            </Chart>
        </BodySection>
    </Content>
  );
}

type IAppProps = {
    selectedCampaigns: string[];
    selectedDataSources: string[];
};

const mapStateToProps = (state: RootStateType) => ({
    selectedCampaigns: state.chart.selectedCampaigns,
    selectedDataSources: state.chart.selectedDataSources,
})

export default connect(
    mapStateToProps
)(App);

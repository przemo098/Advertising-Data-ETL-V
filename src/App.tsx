import React from 'react';
import './App.css';
import {LineChart, Line, XAxis, YAxis} from 'recharts';

const rand = 300;
const data: Array<any> = [];
for (let i = 0; i < 7; i++) {
    let d = {
        year: 2000 + i,
        value: Math.random() * (rand + 50) + 100
    };

    data.push(d);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Advertising Data ETL-V
        </p>
      </header>
        <div >
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
                <XAxis dataKey="year" />
                <YAxis />
            </LineChart>
        </div>
    </div>
  );
}



export default App;

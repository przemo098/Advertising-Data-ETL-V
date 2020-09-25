export  interface IData {
    Date: string,
    Datasource: string,
    Campaign: string,
    Clicks: number,
    Impressions: number
}

let data: Array<IData> = [];

export function listCampaignsUnique(){
    const campaings = data.map(x => x.Campaign);
    const set = new Set(campaings);
    return Array.from(set)
}

export function listDataSourcesUnique(){
    const dataSources = data.map(x => x.Datasource);
    const set = new Set(dataSources);
    return Array.from(set)
}

export function initialize(){
   return fetchCsv().then((x => {
       return data = JSON.parse(csvJSON(x));
   }));
}

function fetchCsv() {
    return fetch('./data/data.csv').then((response) => {
        let reader = response?.body?.getReader();
        if(!reader) return;

        let decoder = new TextDecoder('utf-8');
        return reader.read().then((result) => {
            return decoder.decode(result.value);
        });
    });
}

export interface IDataFilter{
    dataSources: string[];
    campaigns: string[];
}

export interface IChartData{
    data: IData[];
    maxClicksValue: number;
    maxImpressionValue: number;
}

export function displayDataInfo(filter: IDataFilter){
    const dataToShow: IChartData = {
        data: [],
        maxClicksValue: 0,
        maxImpressionValue: 0
    }

    if(!data || data.length === 0)
        return dataToShow;

    data.forEach(x => {
        if(shouldBeDisplayed(filter, x)){
            if(dataToShow.maxImpressionValue < x.Impressions)
                dataToShow.maxImpressionValue = x.Impressions
            if(dataToShow.maxClicksValue < x.Clicks)
                dataToShow.maxClicksValue = x.Clicks
            dataToShow.data.push(x);
        }
    })
    return dataToShow;
}

function shouldBeDisplayed (filter: IDataFilter, element: IData){
    if(filter.dataSources.length === 0 || filter.dataSources.includes(element.Datasource))
        if(filter.campaigns.length === 0 || filter.campaigns.includes(element.Campaign))
            return true;
    return false;
}


function csvJSON(csv){

    const lines=csv.split("\n");
    const result: Array<any> = [];
    const headers = lines[0].split(",");

    for(let i=1;i<lines.length;i++){

        const obj = {};
        const currentline=lines[i].split(",");

        for(let j=0;j<headers.length;j++){
            if(j === 3 || j === 4){
                obj[headers[j]] = parseInt(currentline[j]);
                continue;
            }
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }
    return JSON.stringify(result);
}

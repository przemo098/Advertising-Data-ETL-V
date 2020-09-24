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

function loadMetadata(){

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

export function listData(filter: IDataFilter){
    const toShow = filter ? data : data?.splice(0, 100);
    if(!toShow || toShow.length === 0)
        return [];
    return toShow;
}

function csvJSON(csv){

    const lines=csv.split("\n");
    const result: Array<any> = [];
    const headers = lines[0].split(",");

    for(let i=1;i<lines.length;i++){

        const obj = {};
        const currentline=lines[i].split(",");

        for(let j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }
    return JSON.stringify(result);
}

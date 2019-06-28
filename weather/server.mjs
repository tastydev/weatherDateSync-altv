import * as alt from 'alt';
import Weather from './weather';

let weatherSync = new Weather("YOUR-API-KEY", "Cologne", "DE");

alt.on('consoleCommand', (msg) => {
    switch(msg){
        case "startWeather": weatherSync.startSync();
            break;
        case "stopWeather": weatherSync.stopSync();
            break;
        case "currentTemp": weatherSync.getTemp();
            break;
        case "currentData": weatherSync.getCurrentData();
            break;
        default: break;
    }
});
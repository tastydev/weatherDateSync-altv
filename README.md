# WeatherDateSync Resource

WeatherDateSync resource for alt:V Multiplayer (GTA5).

This resource syncs real weather of citys to the game.

## Commands for Server owners

These commands are directly usable in the server cmd prompt
```
stopWeather // Stop the sync, should only be used if something is broken 
```
```
startWeather // Start the Sync, should only be used if something is broken 
```
```
currentTemp //Prints the current temperature in Celsius (Useless currently)
```
```
currentData //Prints the current synced weather data
```
### Getting Started

1.
```
Sign up to get your api key here https://home.openweathermap.org/
```
2.
```
copy the weather directory to ur resources
```
3.
```
write the "weather" as a module in ur server.cfg
```
4.
```
Do npm install --save node-fetch
```
5.
```
copy ur api key into the constructor of the Weather Class in server.mjs
```
6.
```
Type the city name + countryCode u would like to sync to the game
```

Example:
```
let weatherSync = new Weather("97c33b241d27cwf15c75abb12628ed9e", "Los Angeles", "US");
```

## Authors

* ** Alessandro Lion (t4styy)** - *Initial work* - [t4styy](https://github.com/tastydev)

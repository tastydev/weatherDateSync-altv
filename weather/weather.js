import * as alt from "alt-server";
import fetch from "node-fetch";

export default class Weather {
  constructor(apiKey, city, countryCode) {
    alt.log("~g~RealWeatherTimeSync: started");
    this.apiKey = apiKey;
    this.city = city;
    this.countryCode = countryCode;
    this.url = `https://api.openweathermap.org/data/2.5/
    weather?q=${this.city},${this.countryCode}&appid=${this.apiKey}`;
    this.interval = null;
    this.currentWeatherData = {};
    this.currentWeatherType = 0;
    this.registerEvents();
    this.init();
    this.initWeatherData();
  }

  registerEvents() {
    alt.on("playerConnect", (player) => {
      player.setWeather(this.currentWeatherType);
      this.setDate(player);
    });
  }

  async initWeatherData() {
    try {
      let res = await fetch(this.url);
      let json = await res.json();
      if (json !== undefined) {
        this.currentWeatherData = json;
        this.currentWeatherType = this.getWeatherType();
        this.syncNewData();
      } else {
        alt.log("Weather data couldn´t be updated");
      }
    } catch (err) {
      console.log("Fetching weather failed: " + err);
    }
  }

  getWeatherType() {
    switch (this.currentWeatherData.weather[0].main) {
      case "Drizzle":
        return 8;
      case "Clear":
        return 1;
      case "Clouds":
        return 2;
      case "Rain":
        return 6;
      case "Thunderstorm":
        return 7;
      case "Thunder":
        return 7;
      case "Foggy":
        return 4;
      case "Fog":
        return 4;
      case "Mist":
        return 4;
      case "Smoke":
        return 4;
      case "Smog":
        return 3;
      case "Overcast":
        return 5;
      case "Snowing":
        return 10;
      case "Snow":
        return 10;
      case "Blizzard":
        return 11;
      default:
        return 1;
    }
  }

  init() {
    this.interval = setInterval(() => this.initWeatherData(), 900000); //900000ms = 15 minutes
  }

  syncNewData() {
    for (let player of alt.Player.all) {
      player.setWeather(this.currentWeatherType);
      this.setDate(player);
    }
  }

  setDate(player) {
    const currentDate = new Date();
    player.setDateTime(
      currentDate.getDate(),
      currentDate.getMonth(),
      currentDate.getFullYear(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    );
  }

  tempToCelsius(tempInKelvin) {
    return tempInKelvin - 273.15;
  }

  stopSync() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    alt.log("RealWeatherTimeSync: stopped");
  }

  startSync() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.initWeatherData();
    this.init();
    alt.log("RealWeatherTimeSync: started");
  }

  getTemp() {
    console.log(this.tempToCelsius(this.currentWeatherData.main.temp));
  }

  getCurrentData() {
    console.log(this.currentWeatherData.weather[0]);
    console.log("WeatherType: " + this.currentWeatherType);
  }
}

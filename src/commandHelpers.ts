import { Message } from 'discord.js';
import getCity from './getCity.js';
import { addCity, doesCityExist, countCities, getCityList, getCityArray, cityMover} from './dbHelper'

export const handleCity = async (args: string[], message: Message, saved: boolean): Promise<void> => {
    var city = await getCity(args)
    var cityExistsAlready = doesCityExist(city)
    if (cityExistsAlready) {
        message.channel.send(`City ${city} already exists!`)
    }
    else {
        addCity(city, saved)
        if (saved) {
            message.channel.send(`Yay, we saved the city of ${city}!`)
        }
        else {
            message.channel.send(`The city of ${city} was destroyed. You hate to see it.`)
        }
    }
};

export const getList = (args: string[], message: Message): void => {
    const saved = getCityList(true);
    const destroyed = getCityList(false);
    message.channel.send(`Saved cities: ${saved}`);
    message.channel.send(`Destroyed cities: ${destroyed}`);
};

export const getAlphabeticalList = (args: string[], message: Message): void => {
    var alphaSaved = Object.create(getCityArray(true));
    var alphaDestroyed = Object.create(getCityArray(false));
    alphaSaved = alphaSaved.sort().join(', ');
    alphaDestroyed = alphaDestroyed.sort().join(', ');
    message.channel.send(`Saved cities: ${alphaSaved}`);
    message.channel.send(`Destroyed cities: ${alphaDestroyed}`);
};

export const getCount = async (message: Message): Promise<void> => {
    const saved = countCities(true);
    const destroyed = countCities(false);
    message.channel.send(`${saved} ${saved === 1 ? 'city has' : 'cities have'} been saved!  ${destroyed} ${destroyed === 1 ? 'city has' : 'cities have'} been destroyed.`);

};
//Matt's City Gambler
export const doGamble =(saved: boolean, message: Message): void =>{    // maybe add a variable to wager saved and un saved
   var i = 0;
   if (saved){
    const saveList = getCityArray(false);
    i = getRandomInt(countCities(false));
    var savedCities = [saveList[i]];
    message.channel.send(`Cities reclaimed: ${savedCities}`);
    cityMover(savedCities[0]);
    }
    else if(!saved) {
        const destroyList = getCityArray(true);
        i = getRandomInt(countCities(true));
        var destroyCities = [destroyList[i]];
        message.channel.send(`Cities mismanaged: ${destroyCities}`);
            cityMover(destroyCities[0]);
    }
    else {
    message.channel.send(`ERROR: unknown in Gambler`)
    };
};
//yea i ripped it WHAT you expect me to learn new shit when its right here AHAHAHHA good joke
const getRandomInt = (max: number) => {
      return Math.floor(Math.random() * Math.floor(max));
  };
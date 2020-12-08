import { Message } from 'discord.js';
import getCity from './getCity.js';
import { addCity, doesCityExist, countCities, getCityList, getCityArray} from './dbHelper'

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
    const saved = getCityArray(true).sort();
    const destroyed = getCityArray(false).sort();
    message.channel.send(`Saved cities: ${saved}`);
    message.channel.send(`Destroyed cities: ${destroyed}`);
};

export const getCount = async (message: Message): Promise<void> => {
    const saved = countCities(true);
    const destroyed = countCities(false);
    message.channel.send(`${saved} ${saved === 1 ? 'city has' : 'cities have'} been saved!  ${destroyed} ${destroyed === 1 ? 'city has' : 'cities have'} been destroyed.`);

};
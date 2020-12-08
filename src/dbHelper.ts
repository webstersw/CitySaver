import db from './DataBase';

export const dbConsts = {
    id: "id",
    name: "name",
    saved: "saved",
    destroyed: "destroyed",
}

export const addCity = (city: string, saved: boolean): void => {
    const table = saved ? dbConsts.saved : dbConsts.destroyed;
    db.getInstance().push(`/${table}[]`, city);
};

export const doesCityExist = (city: string): boolean => {
    const savedList = db.getInstance().getData(`/${dbConsts.saved}`);
    const destroyedList = db.getInstance().getData(`/${dbConsts.destroyed}`);

    const existsInSaved = Object.keys(savedList).length !== 0 && savedList.includes(city);
    const existsInDestroyed = Object.keys(destroyedList).length !== 0 && destroyedList.includes(city);

    return existsInSaved || existsInDestroyed;
};

export const countCities = (saved: boolean): number => {
    const cities = getCityArray(saved);
    return cities.length;
};

export const getCityList = (saved: boolean): string => {
    const cities = getCityArray(saved);
    return cities.join(', ');
};

export const getCityArray = (saved: boolean): string[] => {
    const table = saved ? dbConsts.saved : dbConsts.destroyed;
    const cities = db.getInstance().getData(`/${table}`);
   
    return cities;
};
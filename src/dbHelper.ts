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
// Matts City Remover
export const removeCity = (city: string, saved: boolean): void => {
    const table = saved ? getCityArray(saved) : getCityArray(saved);
    const index = table.indexOf(city);
    table.splice(index, 1);
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
// Matts City Mover
export const cityMover = (city: string): void => {
    const savedList = db.getInstance().getData(`/${dbConsts.saved}`);
    const destroyedList = db.getInstance().getData(`/${dbConsts.destroyed}`);

    const existsInSaved = Object.keys(savedList).length !== 0 && savedList.includes(city);
    const existsInDestroyed = Object.keys(destroyedList).length !== 0 && destroyedList.includes(city);
    if(existsInSaved){
        removeCity(city, true)
        addCity(city, false)
    }
    else if (existsInDestroyed){
        removeCity(city, false)
        addCity(city, true)
    };
};
import { getCityHttp } from "./httpRequests";

const randomCityQuery = `https://query.wikidata.org/sparql?query=SELECT%20%3Fcity%20%3Flabel%20WHERE%20%7B%0A%20%20%3Fcity%20rdfs%3Alabel%20%3Flabel%3B%0A%20%20%20%20wdt%3AP31%20wd%3AQ515.%0A%20%20FILTER((LANG(%3Flabel))%20%3D%20%22en%22)%0A%7D%0AORDER%20BY%20(UUID())%0ALIMIT%201`;
              
const getCity = async (args: string[]): Promise<string> => {
    if (args.length === 0) {
        return await getCityHttp(randomCityQuery);
    }
    else {
        return args.join(' ');
    }
};

export default getCity;
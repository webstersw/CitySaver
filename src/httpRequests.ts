import axios from 'axios';

export async function getCityHttp(url: string): Promise<string> {
    const cityPromise =
        axios.get(url, {headers: {'Accept': 'application/sparql-results+json'}})
    .then(function(response) {
        return response.data.results.bindings[0].label.value;
    })
    .catch(function(error) {
        console.log(`ERROR received from ${url}: ${error}\n`);
        return "failed to get random - " + getRandomInt(100000);
    })
    return cityPromise;
};

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
};
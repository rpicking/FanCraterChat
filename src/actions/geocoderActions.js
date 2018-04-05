// must be called with await getPlace(lat, long); in async function
export const getPlace = (lat, long) => {
    const api = "***REMOVED***";

    return fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            lat +
            "," +
            long +
            "&key=" +
            api
    )
        .then(response => response.json())
        .then(responseJson => {
            const results = responseJson.results;
            for (let i = 0; i < results.length; ++i) {
                let types = results[i].types;
                if (types.includes("locality")) {
                    return results[i].formatted_address;
                }
            }
        });
};

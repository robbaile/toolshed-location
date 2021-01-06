const axios = require('axios');

const calculateDistance = require('../helpers/calculateDistance');
const { MY_LOCATION_LATITUDE, MY_LOCATION_LONGITUDE } = require('../constants');

module.exports = async (req, res) => {
    try {
        const customerLocation = await axios.get(`https://api.postcodes.io/postcodes/${req.params.postcode}`)
		const { latitude, longitude } = customerLocation.data.result;
            
        const distanceFromMyLocation = calculateDistance(latitude, longitude, 
			MY_LOCATION_LATITUDE, MY_LOCATION_LONGITUDE, "M");
		
		console.log(`myLongitude: ${MY_LOCATION_LONGITUDE}, Latitude: ${MY_LOCATION_LATITUDE}, customerLong: ${longitude}, customerLat: ${latitude} ,Distance: ${distanceFromMyLocation}`);

		let isDeliverable = false

		if(distanceFromMyLocation > 0) {
			isDeliverable = false
		}

        res.send({ isDeliverable });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}


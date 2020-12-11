const axois = require('axios');

module.exports = async (req, res) => {
    try {
        const [customerLocation, myLocation] = await axois.all([
            axois.get(`https://api.postcodes.io/postcodes/${req.params.postcode}`),
            axois.get(`https://api.postcodes.io/postcodes/SW6 1NF`)
        ]);
            
        const distanceFromMyLocation = distance(customerLocation.data.result.latitude, customerLocation.data.result.longitude, 
            myLocation.data.result.latitude, myLocation.data.result.longitude, "M");

		let isDeliverable = false

		if(distanceFromMyLocation > 0) {
			isDeliverable = false
		}

        res.send({ distance: distanceFromMyLocation, isDeliverable });

    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}

const distance = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
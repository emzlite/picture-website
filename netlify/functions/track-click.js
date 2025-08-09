// A free, no-API-key-required geolocation service
const GEO_API_URL = 'http://ip-api.com/json/';

exports.handler = async function(event, context) {
    
    // 1. Get the data sent from the frontend
    const clickData = JSON.parse(event.body);

    // 2. Get the user's IP address from the request headers (Netlify provides this)
    const userIp = event.headers['x-nf-client-connection-ip'] || 'IP not found';

    let locationData = {
        status: 'fail',
        country: 'Unknown',
        city: 'Unknown'
    };

    // 3. Fetch location data based on the IP address
    try {
        const response = await fetch(`${GEO_API_URL}${userIp}`);
        if (response.ok) {
            locationData = await response.json();
        }
    } catch (error) {
        console.error('Geolocation fetch error:', error);
    }

    // 4. Combine all the information into a single log entry
    const logEntry = {
        ...clickData,
        ip_address: userIp,
        location: {
            city: locationData.city,
            region: locationData.regionName,
            country: locationData.country,
            timezone: locationData.timezone
        }
    };

    // 5. THIS IS THE KEY PART: Logging to the Netlify console
    // Anything you console.log() here will appear in your Netlify Function logs.
    console.log("CLICK_LOG:", JSON.stringify(logEntry, null, 2));

    // 6. Send a success response back to the frontend
    return {
        statusCode: 200,
        body: JSON.stringify({ status: 'logged', data: logEntry })
    };
};